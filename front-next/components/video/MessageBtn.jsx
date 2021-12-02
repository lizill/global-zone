import React, { useState, useEffect, memo, useCallback, useRef } from 'react';
import { AiFillMessage, AiOutlineRight } from 'react-icons/ai';
import { IoSend } from 'react-icons/io5';

import styles from '../../styles/video/video.module.scss';

const MessageItems = memo(({ item, me }) => {
  return (
    <div className={item.name === me.name ? styles.myMessage : styles.peerMessage}>
      {item.name !== me.name && <label htmlFor="peerMessage">{item.name}</label>}
      <p id="peerMessage">{item.contents}</p>
    </div>
  )
});

const MessageBtn = ({ socketRef, me }) => {
  const [isMessageOpen, setMessageOpen] = useState(false);
  const [newMessage, setNewMessage] = useState('');
	const [messages, setMessages] = useState([]);
  const articleRef = useRef();

  const onChangeMessage = useCallback((e) => {
    setNewMessage(e.target.value)
  }, [newMessage]);

  const onSubmit = useCallback((e) => {
    e.preventDefault()
    if (newMessage.trim() === '') return
    
    const data = {
      name: me.name,
      contents: newMessage
    }
    socketRef.current.emit('message', data);
    setMessages((prev) => {
      return [...prev, data]
    });
    setNewMessage('');
  }, [me, newMessage, socketRef]);

  const setArticleHeight = useCallback(() => {
    if(articleRef.current) {
      articleRef.current.scrollTop = articleRef.current.scrollHeight;
    }
  }, [articleRef]);

	useEffect(() => {
		socketRef.current?.on('newmessage', (data) => {
			setMessages((prev) => {
				return [...prev, data]
			})
		})
	}, [socketRef]);

  useEffect(() => {
    setArticleHeight();
  }, [messages, isMessageOpen]);

  return (
    <>
      <AiFillMessage className={styles.messageBtn} onClick={() => setMessageOpen(!isMessageOpen)}/>

      {/* Message Modal */}
      {isMessageOpen &&
        <section className={styles.messageWrap}>
          <header>
            <AiOutlineRight className={styles.closeMessage} onClick={() => setMessageOpen(false)}/>
          </header>
          <article ref={articleRef}>
            {messages.length !== 0 && messages.map((v, i) => <MessageItems key={i} item={v} me={me}/>)}
          </article>
          <form onSubmit={onSubmit} className={styles.sendMessage}>
            <input placeholder="메세지를 입력해주세요" value={newMessage} autoFocus type="text" onChange={onChangeMessage} />
            <IoSend className={styles.sendIcon} onClick={onSubmit}/>
          </form>
        </section>
      }
    </>
  )
}

export default memo(MessageBtn);
