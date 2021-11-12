import React from "react";
import { AiFillSound, AiOutlineSound } from 'react-icons/ai';
import { BsFillCameraVideoFill, BsFillTelephoneXFill, BsCameraVideoOff } from 'react-icons/bs';

import styles from '../../styles/video/video.module.scss';

const BtnMenu = ({ isAudioMuted, isVideoOff, audioMute, videoOff, endCall }) => {
  return (
    <div className={styles.buttonWrap}>
      { isAudioMuted
      ? <AiOutlineSound onClick={() => audioMute()} className={styles.muteBtn}/>
      : <AiFillSound onClick={() => audioMute()} className={styles.muteBtn}/> }
      { isVideoOff 
      ? <BsCameraVideoOff onClick={() => videoOff()} className={styles.videoOffBtn}/> 
      : <BsFillCameraVideoFill onClick={() => videoOff()} className={styles.videoOffBtn}/> }
      <BsFillTelephoneXFill onClick={endCall} className={styles.endCallBtn}/>
    </div>
  )
}

export default BtnMenu;
