import Modal from "../../shared/components/modal/Modal";
import {Loader} from "../../shared/components/loader/Loader";
import styles from './Popup.module.scss'
import {Input} from "../../shared/components/input/Input";
import {Button} from "../../shared/components/button/Button";
import React, {ChangeEvent, FormEvent} from "react";

type AddNodeModalPropsType = {
    isOpen: boolean,
    setModal: (value: boolean) => void,
    inputValue: string,
    onChangeInputValue: (value: ChangeEvent<HTMLInputElement>) => void,
    onAddButtonClick: (e: FormEvent<HTMLFormElement>) => void,
    isLoading: boolean
}

export const AddNodeModal = ({
                                 isOpen,
                                 setModal,
                                 inputValue,
                                 onChangeInputValue,
                                 onAddButtonClick,
                                 isLoading
                             }: AddNodeModalPropsType) => {
    return (
        <Modal modal={isOpen} setModal={() => setModal(false)}>
            {isLoading ? <Loader/> : <form className={styles.form} onSubmit={onAddButtonClick}>
                <div className={styles.title}>Add</div>
                <Input placeholder='Node Name' value={inputValue} onChange={onChangeInputValue} id='node-name'
                       fullWidth/>
                <div className={styles.buttons}>
                    <Button onClick={() => setModal(false)} name='Cancel' variant='red' />
                    <Button name='Add' variant='blue' type='submit'/>
                </div>
            </form>}
        </Modal>
    )
}