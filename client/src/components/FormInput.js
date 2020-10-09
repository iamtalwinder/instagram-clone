import React, { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "./FormInput.module.css";

export default function FormInput(props) {
  const containerId = uuidv4();
  const inputId = uuidv4();
  useEffect(() => {
    const container = document.getElementById(containerId);
    const input = document.getElementById(inputId);
    console.log(input);
    input.addEventListener("focus", () => {
      container.style.borderColor = "#262626";
    });

    input.addEventListener("blur", () => {
      container.style.borderColor = "#cfccca";
    });
  }, [containerId, inputId]);

  return (
    <div className={styles.container} id={containerId}>
      <input
        id={inputId}
        name={props.name}
        type={props.type}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        required={props.required}
      />
      <label>{props.placeholder}</label>
    </div>
  );
}
