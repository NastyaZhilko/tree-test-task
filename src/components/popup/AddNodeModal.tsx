import Modal from "../../shared/components/modal/Modal";
import {Loader} from "../../shared/components/loader/Loader";
import styles from "../tree/treeItem/TreeItem.module.scss";
import {Input} from "../../shared/components/input/Input";
import {Button} from "../../shared/components/button/Button";
import React, {ChangeEvent} from "react";

type AddNodeModalPropsType = {
    isOpen: boolean,
    setModal: (value: boolean) => void,
    inputValue: string,
    onChangeInputValue: (value: ChangeEvent<HTMLInputElement>) => void,
    onAddButtonClick: () => void,
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
            {isLoading ? <Loader/> : <div className={styles.form}>
                <h2>Add</h2>
                <Input placeholder='Node Name' value={inputValue} onChange={onChangeInputValue} id='node-name'
                       fullWidth/>
                <div className={styles.buttons}>
                    <Button onClick={() => setModal(false)} name='Cancel' variant='red'/>
                    <Button onClick={onAddButtonClick} name='Add' variant='blue'/>
                </div>
            </div>}
        </Modal>
    )
}