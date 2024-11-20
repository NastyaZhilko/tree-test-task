import Modal from "../../shared/components/modal/Modal";
import {Loader} from "../../shared/components/loader/Loader";
import styles from './Popup.module.scss'
import {Button} from "../../shared/components/button/Button";
import React from "react";

type DeleteNodeModalPropsType = {
    isOpen: boolean,
    setModal: (value: boolean) => void,
    nodeName: string;
    onDeleteButtonClick: () => void,
    isLoading: boolean
}

export const DeleteNodeModal = ({
                                    isOpen,
                                    setModal,
                                    nodeName,
                                    onDeleteButtonClick,
                                    isLoading
                                }: DeleteNodeModalPropsType) => {
    return (
        <Modal modal={isOpen} setModal={() => setModal(false)}>
            {isLoading ? <Loader/> : <div className={styles.form}>
                <div className={styles.title}>Do you want to delete <span className={styles.nodeName}>"{nodeName}"</span></div>
                <div className={styles.buttons}>
                    <Button onClick={() => setModal(false)} name='Cancel' variant='red'/>
                    <Button onClick={onDeleteButtonClick} name='Delete' variant='blue'/>
                </div>
            </div>}
        </Modal>
    )
}