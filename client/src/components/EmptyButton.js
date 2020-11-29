import React from "react";
import styles from "./EmptyButton.module.css";

export default function EmptyButton(props) {
  return (
    <button
      className={styles.button}
      style={props.style}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}
