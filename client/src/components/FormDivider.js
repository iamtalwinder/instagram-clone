import React from "react";
import styles from "./FormDivider.module.css";

export default function FormDivider(props) {
  return (
    <div className={styles.divider} style={props.style}>
      <p className={styles.text}>OR</p>
    </div>
  );
}
