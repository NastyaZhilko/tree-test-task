import React, {ChangeEvent} from "react";
import styles from "./Input.module.scss";
import classNames from "classnames";

type InputPropsType = {
    placeholder: string;
    value: string;
    onChange: (value: ChangeEvent<HTMLInputElement>) => void;
    id: string
    fullWidth: boolean;
}

export const Input = ({placeholder, value, onChange, id, fullWidth}: InputPropsType) => {
    return (
        <input type={'text'}
               placeholder={placeholder}
               value={value}
               id={id}
               onChange={onChange}
               className={classNames(styles.root, {[styles.fullWidth]: fullWidth})}
        />
    )
}