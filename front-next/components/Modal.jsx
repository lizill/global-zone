import React, { useCallback } from 'react';
import { IoMdClose } from 'react-icons/io';
import { useSelector, useDispatch } from "react-redux";

import styles from '../styles/layout/Modal.module.scss';
import { closeModalAction } from "../reducers/user";

const Modal = ({ children }) => {
    const { isModalOpen } = useSelector(state => state.user);
    const dispatch = useDispatch();

    const onClose = useCallback(() => {
        dispatch(closeModalAction());
    }, []);

    return (
        <div className={styles.modalWrap} style={isModalOpen ? { display: "block" } : { display: 'none' }}>
            <div className={styles.modalContent}>
                <header>
                    <IoMdClose className={styles.closeBtn} onClick={onClose}/>
                </header>

                <main>
                    { children }
                </main>
            </div>
        </div>
    )
}

export  default Modal;
