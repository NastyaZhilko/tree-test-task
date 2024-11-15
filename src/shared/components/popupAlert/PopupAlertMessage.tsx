import styles from './PopupAlertMessage.module.scss';
import { PopupAlertPropsType } from './types';

export const PopupAlertMessage = (props: PopupAlertPropsType) => {
    const { title, text } = props;

    return (
        <>
            <p className={styles.header}>{title}</p>
            <p className={styles.text}>{text}</p>
        </>
    );
};