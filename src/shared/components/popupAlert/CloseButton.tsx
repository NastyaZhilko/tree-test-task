import React from 'react';
import { IoMdClose } from "react-icons/io";

interface ICloseButton {
    closeToast?: (e: React.MouseEvent<HTMLElement>) => void;
}

export const CloseButton = (props: ICloseButton) => {
    const { closeToast } = props;
    return (
        <div onClick={closeToast}>
            <IoMdClose />
        </div>
    );
};