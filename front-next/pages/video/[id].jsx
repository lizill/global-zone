import React, { useEffect, useRef, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import axios from 'axios';
import { END } from 'redux-saga';
import io from 'socket.io-client';
import router from "next/router";

import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';
import { LOAD_SCHEDULE_REQUEST } from '../../reducers/schedule';
import PeerVideo from "../../components/video/PeerVideo";
import BtnMenu from '../../components/video/BtnMenu';
import styles from '../../styles/video/video.module.scss';
import wrapper from '../../store/configuresStore';
import Loader from '../../components/Loader';
import { SOCKET_SERVER_URL } from '../../config/config';

const pc_config = {
  "iceServers": [
      {
          urls : 'stun:stun.l.google.com:19302'
      }
  ]
};

const Video = () => {
  const { schedule } = useSelector(state => state?.schedule);
  const { me } = useSelector(state => state?.user);
	const socketRef = useRef();
	const pcsRef = useRef({});
	const localVideoRef = useRef(null);
	const localStreamRef = useRef();
  const [users, setUsers] = useState([]);
	const [isAudioMuted, setAudioMute] = useState(false);
	const [isVideoOff, setVideoOff] = useState(false);
	const [isLoading, setLoading] = useState(true);
	const [showVideo, setShowVideo] = useState(null);

	const getLocalStream = useCallback(async () => {
		try {
			const localStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' }, audio: true });
			localStreamRef.current = localStream;
			if (localVideoRef.current) localVideoRef.current.srcObject = localStream;
			if (!socketRef.current) return;
			socketRef.current.emit('join_room', {
				room: schedule?.password,
				userName: me?.name,
			});
		} catch (e) {
			console.error(`getUserMedia error: ${e}`);
		}
	}, []);

	const createPeerConnection = useCallback((socketID, userName) => {
		try {
			const pc = new RTCPeerConnection(pc_config);

			pc.onicecandidate = (e) => {
				if (!(socketRef.current && e.candidate)) return;
				// console.log('onicecandidate');
				socketRef.current.emit('candidate', {
					candidate: e.candidate,
					candidateSendID: socketRef.current.id,
					candidateReceiveID: socketID,
				});
			};

			// pc.oniceconnectionstatechange = (e) => {
			// 	console.log(e);
			// };

			pc.ontrack = (e) => {
				// console.log('ontrack success');
				setUsers((oldUsers) =>
					oldUsers
						.filter((user) => user.id !== socketID)
						.concat({
							id: socketID,
							userName,
							stream: e.streams[0],
						}),
				);
			};

			if (localStreamRef.current) {
				// console.log('localstream add');
				localStreamRef.current.getTracks().forEach((track) => {
					if (!localStreamRef.current) return;
					pc.addTrack(track, localStreamRef.current);
				});
			} else {
				console.error('no local stream');
			}

			return pc;
		} catch (e) {
			console.error(e);
			return undefined;
		}
	}, []);

	const handleMuteClick = () => {
		// console.log('audio mute')
		localStreamRef.current
			.getAudioTracks()
			.forEach(track => track.enabled = !track.enabled);
		if(!isAudioMuted) {
			setAudioMute(true);
		} else {
			setAudioMute(false);
		}
	}

	const handleCameraClick = () => {
		// console.log('video click')
		localStreamRef.current
			.getVideoTracks()
			.forEach(track => track.enabled = !track.enabled);
		if(isVideoOff) {
			setVideoOff(false);
		} else {
			setVideoOff(true);
		}
	}

	const handleEndCall = () => {
		whenUserLeavePage();
		if(me?.position === 'korean') {
			router.push('/');
		} else {
			router.push('/foreign/schedule');
		}
	}

	const whenUserLeavePage = () => {
		// const isLeave = confirm('????????? ?????????????????????????')
		// // const isLeave = true

		// if (!isLeave) {
		// 	throw `Route change was aborted (this error can be safely ignored).`;
		// }

		setLoading(true)

		if (socketRef.current) {
			socketRef.current.disconnect();
		}
		users.forEach((user) => {
			if (!pcsRef.current[user.id]) return;
			pcsRef.current[user.id].close();
			delete pcsRef.current[user.id];
		});
		localStreamRef.current
			?.getTracks()
			.forEach(track => track.stop());
	}

  useEffect(async () => {
		if (me.position === 'korean') { // ????????? ???????????? ??????
			const findUser = schedule.reservations.find(v => v.user_id == me.id);

			if (!findUser) { // ????????? ???????????? ?????? ??????
				alert('?????? ????????? ???????????? ????????????.');
				return router.push('/');
			}
	
			if (findUser && !findUser.confirmed) {
				alert('???????????? ?????? ??????????????????.');
				return router.push('/');
			}
		} else { // ???????????? ??????
			if (me.id != schedule.user_id) {
				alert('????????? ???????????? ????????????.');
				return router.push('/foreign/schedule');
			}
		}

		setLoading(false)

		socketRef.current = io.connect(SOCKET_SERVER_URL);
    getLocalStream();

		socketRef.current.on('all_users', (allUsers) => {
			allUsers.forEach(async (user) => {
        // console.log('join room', localStreamRef.current)
				if (!localStreamRef.current) return;
				const pc = createPeerConnection(user.id, user.userName);
				if (!(pc && socketRef.current)) return;
				pcsRef.current = { ...pcsRef.current, [user.id]: pc };
				try {
					const localSdp = await pc.createOffer({
						offerToReceiveAudio: true,
						offerToReceiveVideo: true,
					});
					// console.log('create offer success');
					await pc.setLocalDescription(new RTCSessionDescription(localSdp));
					socketRef.current.emit('offer', {
						sdp: localSdp,
						offerSendID: socketRef.current.id,
						offerSendEmail: me.name,
						offerReceiveID: user.id,
					});
				} catch (e) {
					console.error(e);
				}
			});
		});

		socketRef.current.on('getOffer', async (data) => {
      const { sdp, offerSendID, offerSendEmail } = data;
      // console.log('get offer');
      if (!localStreamRef.current) return;
      const pc = createPeerConnection(offerSendID, offerSendEmail);
      if (!(pc && socketRef.current)) return;
      pcsRef.current = { ...pcsRef.current, [offerSendID]: pc };
      try {
        await pc.setRemoteDescription(new RTCSessionDescription(sdp));
        // console.log('answer set remote description success');
        const localSdp = await pc.createAnswer({
          offerToReceiveVideo: true,
          offerToReceiveAudio: true,
        });
        await pc.setLocalDescription(new RTCSessionDescription(localSdp));
        socketRef.current.emit('answer', {
          sdp: localSdp,
          answerSendID: socketRef.current.id,
          answerReceiveID: offerSendID,
        });
      } catch (e) {
        console.error(e);
      }
    });

		socketRef.current.on('getAnswer', (data) => {
      const { sdp, answerSendID } = data;
      // console.log('get answer');
      const pc = pcsRef.current[answerSendID];
      if (!pc) return;
      pc.setRemoteDescription(new RTCSessionDescription(sdp));
    });

		socketRef.current.on(
			'getCandidate',
			async (data) => {
				// console.log('get candidate');
				const pc = pcsRef.current[data.candidateSendID];
				if (!pc) return;
				await pc.addIceCandidate(new RTCIceCandidate(data.candidate));
				// console.log('candidate add success');
			},
		);

		socketRef.current.on('user_exit', (data) => {
			if (!pcsRef.current[data.id]) return;
			pcsRef.current[data.id].close();
			delete pcsRef.current[data.id];
			setUsers((oldUsers) => oldUsers.filter((user) => user.id !== data.id));
		});

		return () => whenUserLeavePage;
	}, [createPeerConnection, getLocalStream]);

	useEffect(() => {
		// ???????????? ??? ????????? ????????? ????????????
		router.events.on('routeChangeStart', whenUserLeavePage);

		return () => {
			router.events.off('routeChangeStart', whenUserLeavePage);
		}
	}, []);

	if(isLoading) return <Loader/>

	if(users.length === 0) return (
		<div className={styles.emptyRoom}>
			<h4>????????? ???????????? ??????????????????</h4>
			<Loader/>
		</div>
	)

  return (
    <div className={styles.videoWrap}>
      <div className={styles.videoContent}>
        <div className={styles.peersWrap}>
					{showVideo && (
						<div onClick={() => setShowVideo(null)} className={styles.peerVideo}>
              <PeerVideo name={me.name} stream={localStreamRef.current}/>
						</div>
					 )}
          {users.filter(v => v !== showVideo).map((user, index) => (
            <div onClick={() => setShowVideo(user)} key={index} className={styles.peerVideo}>
              <PeerVideo name={user.userName} stream={user.stream}/>
            </div>
          ))}
        </div>
        <div className={styles.video}>
					{showVideo
						? <PeerVideo name={showVideo?.userName} stream={showVideo?.stream}/>
						: <PeerVideo name={me.name} stream={localStreamRef.current}/>}
						{/* : <video ref={localVideoRef} autoPlay muted/>} */}
        </div>
				<BtnMenu
					isAudioMuted={isAudioMuted}
					isVideoOff={isVideoOff}
					audioMute={handleMuteClick}
					videoOff={handleCameraClick}
					endCall={handleEndCall}
					me={me}
					reservations={schedule.reservations}
					socketRef={socketRef}
				/>
      </div>
    </div>
  )
}

export default Video;

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, params }) => {
  const cookie = req ? req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (req && cookie) {
      axios.defaults.headers.Cookie = cookie;
  }
  store.dispatch({
      type: LOAD_MY_INFO_REQUEST,
  });
  store.dispatch({
      type: LOAD_SCHEDULE_REQUEST,
      data: params.id,
  });
  store.dispatch(END);
  await store.sagaTask.toPromise();
});
