import style from './Modal.module.scss'
import {ReactNode} from "react";


interface ModalType {
    modal: boolean
    setModal: (value: boolean) => void
    children?: ReactNode
}


const Modal = ({modal, setModal, children}: ModalType) => {
    const finalModalClassName = `${style.modal} ${modal ? style.active : ""}`;
    const finalModalContentClassName = `${style.modal_content} ${modal ? style.active : ""}`;
    return (
        <div className={finalModalClassName} onClick={ () => setModal(false)}>
            <div className={finalModalContentClassName} onClick={e =>  e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default Modal;