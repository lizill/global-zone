import React from 'react'
import { AiOutlineDownCircle } from 'react-icons/ai'

import styles from '../../styles/reservation/Reservation.module.scss'

const ContentBtn = ({ content, on, onList }) => {
  return (
    <button onClick={() => onList(content.name)}>
      <img src={content.src} alt="" />
      <p>{content.p}</p>
      <AiOutlineDownCircle
        className={styles.icon}
        style={
          on === content.name 
          ? { transform: "rotate(180deg)" }
          : { transform: "rotate(0deg)" }
        }
      />
    </button>
  )
}

export default ContentBtn
