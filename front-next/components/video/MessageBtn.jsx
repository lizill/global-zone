import React, { useState, useEffect } from 'react';
import { AiFillMessage, AiOutlineRight } from 'react-icons/ai';
import { IoSend } from 'react-icons/io5';

import styles from '../../styles/video/video.module.scss';

const MessageItems = ({item}) => {
  return (
    <div>
      <label htmlFor="peerMessage">{item.name}</label>
      <p id="peerMessage">{item.contents}</p>
    </div>
  )
}

const MessageBtn = ({ socketRef, me }) => {
  const [isMessageOpen, setMessageOpen] = useState(false);
  const [newMessage, setNewMessage] = useState('');
	const [messages, setMessages] = useState([]);

  const onChangeMessage = (e) => {
    setNewMessage(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    
    socketRef.current.emit('message', { name: me.name, contents: newMessage })
    setNewMessage('');
  }

	useEffect(() => {
		socketRef.current?.on('newmessage', (data) => {
			setMessages((prev) => {
				return [...prev, data]
			})
		})
	}, [socketRef])

  return (
    <>
      <AiFillMessage className={styles.messageBtn} onClick={() => setMessageOpen(!isMessageOpen)}/>

      {/* Message Modal */}
      {isMessageOpen &&
        <section className={styles.messageWrap}>
          <header>
            <AiOutlineRight onClick={() => setMessageOpen(false)}/>
          </header>
          <article>
            {messages.length !== 0 && messages.map(v => <MessageItems item={v}/>)}
          </article>
          <form onSubmit={onSubmit} className={styles.sendMessage}>
            <input placeholder="메세지를 입력해주세요" value={newMessage} autoFocus type="text" onChange={onChangeMessage} />
            <IoSend onClick={onSubmit}/>
          </form>
        </section>
      }
    </>
  )
}

export default MessageBtn;
