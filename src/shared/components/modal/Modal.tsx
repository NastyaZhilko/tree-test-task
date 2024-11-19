import style from './Modal.module.scss'
import {ReactNode} from "react";
import classNames from "classnames";


interface ModalType {
    modal: boolean
    setModal: (value: boolean) => void
    children?: ReactNode
}


const Modal = ({modal, setModal, children}: ModalType) => {
    return (
        <div className={classNames(style.modal, {[style.active]: modal})} onClick={ () => setModal(false)}>
            <div className={classNames(style.modalContent, {[style.active]: modal})} onClick={e =>  e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default Modal;