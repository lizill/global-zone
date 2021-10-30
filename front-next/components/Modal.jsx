import React from 'react';
import { IoMdClose } from 'react-icons/io'

import styles from '../styles/layout/Modal.module.scss'

const Modal = ({ children, isOpen }) => {
    return (
        <div className={styles.modalWrap} style={isOpen ? { display: "block" } : { display: 'none' }}>
            <div className={styles.modalContent}>
                <header>
                    <IoMdClose onClick={() => console.log('click')}/>
                </header>

                <main>
                    { children }
                </main>
            </div>
        </div>
    )
}

export  default Modal;
