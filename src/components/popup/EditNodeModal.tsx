import Modal from "../../shared/components/modal/Modal";
import {Loader} from "../../shared/components/loader/Loader";
import styles from './Popup.module.scss'
import {Input} from "../../shared/components/input/Input";
import {Button} from "../../shared/components/button/Button";
import React, {ChangeEvent, FormEvent} from "react";

type EditNodeModalPropsType = {
    isOpen: boolean,
    setModal: (value: boolean) => void,
    inputValue: string,
    onChangeInputValue: (value: ChangeEvent<HTMLInputElement>) => void,
    onEditButtonClick: (e: FormEvent<HTMLFormElement>) => void,
    isLoading: boolean
}

export const EditNodeModal = ({
                                  isOpen,
                                  setModal,
                                  inputValue,
                                  onChangeInputValue,
                                  onEditButtonClick,
                                  isLoading
                              }: EditNodeModalPropsType) => {
    return (
        <Modal modal={isOpen} setModal={() => setModal(false)}>
            {isLoading ? <Loader/> : <form className={styles.form} onSubmit={onEditButtonClick}>
                <div className={styles.title}>Edit</div>
                <Input placeholder='New node name' value={inputValue} onChange={onChangeInputValue} id='new-node-name'
                       fullWidth/>
                <div className={styles.buttons}>
                    <Button onClick={() => setModal(false)} name='Cancel' variant='red'/>
                    <Button name='Rename' variant='blue' type='submit'/>
                </div>
            </form>}
        </Modal>
    )
}