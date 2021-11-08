import React, { useEffect, useRef, useState } from "react";

import MyVideo from '../../components/video/MyVideo';
import BtnMenu from '../../components/video/BtnMenu';
import styles from '../../styles/video/video.module.scss'

const Video = () => {
  const [mediaStream, setMediaStream]= useState();
  const videoRef= useRef(null);

  useEffect(()=> {
    setupWebcamVideo();
  }, [mediaStream]);

  async function setupWebcamVideo() {
    if (!mediaStream) {
      await setupMediaStream();
    } else {
      const videoCurr = videoRef.current;

      if (!videoCurr) return;

      const video = videoCurr;

      if (!video.srcObject) {
        video.srcObject = mediaStream;
      }
    }
  }

  async function setupMediaStream() {
    try {
      const ms = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' }, audio: true });
      setMediaStream(ms);
    } catch (err) {
      alert('Camera is disabled');
      throw err;
    }
  }

  return (
    <div className={styles.videoWrap}>
      <div className={styles.videoContent}>
        <div className={styles.peersWrap}>
          <div className={styles.peerVideo}>
            <video/>
          </div>
          <div className={styles.peerVideo}>
            <video/>
          </div>
          <div className={styles.peerVideo}>
            <video/>
          </div>
          <div className={styles.peerVideo}>
            <video/>
          </div>
        </div>
        <div className={styles.video}>
          <video ref={videoRef} autoPlay muted />
        </div>
      </div>
      <BtnMenu/>
    </div>
  )
}

export default Video;
