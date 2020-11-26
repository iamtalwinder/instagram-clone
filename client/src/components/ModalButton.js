import React from "react";
import styles from "./ModalButton.module.css";

export default function ModalButton({
  children,
  disabled,
  style,
  onClick,
  id,
}) {
  return (
    <button
      className={disabled ? styles.disabled : styles.active}
      disabled={disabled}
      style={style}
      onClick={onClick}
      id={id}
    >
      {children}
    </button>
  );
}
