import { ToastOptions, toast } from 'react-toastify';
import { PopupAlertPropsType } from './types';
import { PopupAlertMessage } from './PopupAlertMessage';
import { CloseButton } from './CloseButton';
import styles from './PopupAlertMessage.module.scss';
import classNames from 'classnames';
import {TOAST_CONTAINER_ID} from "../../../index";

const alertOptions = (variant: 'error' | 'success'): ToastOptions<unknown> => {
    return {
        closeButton: CloseButton,
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        rtl: false,
        pauseOnFocusLoss: true,
        draggable: true,
        pauseOnHover: true,
        theme: 'light',
        className: classNames(styles.popupAlert, styles[variant]),
    };
};

export const alert = (myProps: PopupAlertPropsType, toastProps: ToastOptions<unknown> | undefined) =>
    toast(<PopupAlertMessage {...myProps} />, { ...toastProps, containerId: TOAST_CONTAINER_ID });

alert.success = (myProps: PopupAlertPropsType, toastProps: ToastOptions<unknown> | undefined) =>
    toast.success(<PopupAlertMessage {...myProps} />, {
        ...toastProps,
        ...alertOptions('success'),
        containerId: TOAST_CONTAINER_ID,
    });

alert.error = (myProps: PopupAlertPropsType, toastProps: ToastOptions<unknown> | undefined) =>
    toast.error(<PopupAlertMessage {...myProps} />, {
        ...toastProps,
        ...alertOptions('error'),
        containerId: TOAST_CONTAINER_ID,
    });
