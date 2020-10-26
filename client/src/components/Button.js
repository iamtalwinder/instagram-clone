import React from "react";
import styles from "./Button.module.css";
import Spinner from "./Spinner";

export default function Button(props) {
  return (
    <button
      className={props.disabled ? styles.disabled : styles.active}
      style={props.style}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.loading ? <Spinner color="#ffffff" /> : props.children}
    </button>
  );
}
