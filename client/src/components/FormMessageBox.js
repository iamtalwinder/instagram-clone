import React from "react";
import styles from "./FormMessageBox.module.css";

export default function FormMessageBox(props) {
  let color;
  if (props.error) {
    color = "red";
  } else {
    color = "green";
  }

  let style = props.style || {};

  style.color = color;
  return (
    <p className={styles.errorBox} style={style}>
      {props.message}
    </p>
  );
}
