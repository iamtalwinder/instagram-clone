import React from "react";
import styles from "./FormInput.module.css";

export default function FormInput(props) {
  return (
    <input
      className={styles.input}
      style={props.style}
      name={props.name}
      type={props.type}
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
      required={props.required}
    />
  );
}
