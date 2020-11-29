import React from "react";
import styles from "./IconButton.module.css";
import Icon from "@mdi/react";

export default function IconButton(props) {
  return (
    <button
      className={styles.button}
      style={props.style}
      type={props.type}
      onClick={props.onClick}
    >
      {<Icon path={props.path} size={props.iconSize || 1.2} verticle="true" />}
      {<p className={styles.text}>{props.children}</p>}
    </button>
  );
}
