import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { AiFillSound, AiOutlineSound } from 'react-icons/ai';
import { BsFillCameraVideoFill, BsFillTelephoneXFill, BsCameraVideoOff } from 'react-icons/bs';
import { FaListAlt } from 'react-icons/fa';

import styles from '../../styles/video/video.module.scss';
import AttendanceCheck from "./AttendanceCheck";
import Modal from "../Modal";
import { openModalAction } from "../../reducers/user";

const BtnMenu = ({ isAudioMuted, isVideoOff, audioMute, videoOff, endCall, me, reservations }) => {
  const dispatch = useDispatch();

  const onOpenModal = useCallback(() => {
    dispatch(openModalAction());
  }, []);

  return (
    <div className={styles.buttonWrap}>
      { isAudioMuted
      ? <AiOutlineSound onClick={() => audioMute()} className={styles.muteBtn}/>
      : <AiFillSound onClick={() => audioMute()} className={styles.muteBtn}/> }
      { isVideoOff 
      ? <BsCameraVideoOff onClick={() => videoOff()} className={styles.videoOffBtn}/> 
      : <BsFillCameraVideoFill onClick={() => videoOff()} className={styles.videoOffBtn}/> }
      <BsFillTelephoneXFill onClick={endCall} className={styles.endCallBtn}/>
      {me.position !== 'korean' && 
        <>
          <FaListAlt className={styles.checkBtn} onClick={onOpenModal}/>
          <Modal>
            <AttendanceCheck reservations={reservations}/>
          </Modal>
        </>}
    </div>
  )
}

export default BtnMenu;
