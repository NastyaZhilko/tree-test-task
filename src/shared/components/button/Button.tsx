import React from "react";
import styles from "./Button.module.scss";
import classNames from "classnames";

type ButtonPropsType = {
    type?: "button" | "submit" | "reset";
    name: string
    variant: 'red' | 'blue'
    disabled?: boolean
    onClick?: () => void
}

export const Button = ({type = 'button', onClick, name, disabled, variant}: ButtonPropsType) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={classNames(styles.root, styles[variant])}
        >
            {name}
        </button>
    )
}