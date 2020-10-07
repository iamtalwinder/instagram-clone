import React from "react";
import styles from "./Button.module.css";
import Icon from "@mdi/react";
import { mdiLoading } from "@mdi/js";

export default function Button(props) {
  return (
    <button
      className={props.disabled ? styles.disabled : styles.active}
      style={props.style}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.loading ? (
        <Icon path={mdiLoading} size={0.6} horizontal color="#ffffff" spin />
      ) : (
        props.children
      )}
    </button>
  );
}
