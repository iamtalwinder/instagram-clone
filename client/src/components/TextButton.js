import React from "react";
import styles from "./TextButton.module.css";
import Spinner from "./Spinner";

export default function Button(props) {
  let spinnerColor = "#0095f6";
  if (props.style && props.style.color) {
    spinnerColor = props.style.color;
  }
  return (
    <button
      id={props.id}
      className={props.disabled ? styles.disabled : styles.active}
      style={props.style}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.loading ? <Spinner color={spinnerColor} /> : props.children}
    </button>
  );
}
