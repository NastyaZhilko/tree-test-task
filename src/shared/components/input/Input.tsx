import React, {ChangeEvent} from "react";
import styles from "./Input.module.scss";

type InputTypeProps = {
    placeholder: string;
    value: string;
    onChange: (value: ChangeEvent<HTMLInputElement>) => void;
    id: string
}

export const Input = ({placeholder, value, onChange, id}: InputTypeProps) => {
    return (
        <input type={'text'}
               placeholder={placeholder}
               value={value}
               id={id}
               onChange={onChange}
               className={styles.root}
        />
    )
}