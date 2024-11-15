import React from "react";
import styles from "./Button.module.scss";
import classNames from "classnames";

type ButtonPropsType = {
    onClick: () => void
    name: string
    variant: 'red'|'blue'
    disabled?: boolean
}

export const Button = ({onClick, name, disabled, variant}: ButtonPropsType) => {
    return (
        <button onClick={onClick} disabled={disabled} className={classNames(styles.root, styles[variant])}>{name}</button>
    )
}