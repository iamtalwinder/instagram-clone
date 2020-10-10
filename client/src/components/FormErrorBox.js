import React from "react";
import styles from "./FormErrorBox.module.css";

export default function FormErrorBox(props) {
  return <p className={styles.errorBox}>{props.error}</p>;
}
