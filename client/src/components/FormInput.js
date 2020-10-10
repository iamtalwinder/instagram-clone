import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "./FormInput.module.css";
import Icon from "@mdi/react";
import { mdiAlphaXCircleOutline } from "@mdi/js";
import { mdiCheckCircleOutline } from "@mdi/js";

export default function FormInput(props) {
  const [type, setType] = useState(props.type);
  const [text, setText] = useState("Show");
  const [focus, setFocus] = useState(false);
  const handleChange = () => {
    if (type === "password") {
      setType("text");
      setText("Hide");
    } else {
      setType("password");
      setText("Show");
    }
  };
  const containerId = uuidv4();
  const inputId = uuidv4();
  useEffect(() => {
    const container = document.getElementById(containerId);
    const input = document.getElementById(inputId);
    console.log(input);
    input.addEventListener("focus", () => {
      container.style.borderColor = "#262626";
      setFocus(true);
    });

    input.addEventListener("blur", () => {
      container.style.borderColor = "#cfccca";
      setFocus(false);
    });
  }, [containerId, inputId]);

  return (
    <div className={styles.container} id={containerId}>
      <input
        id={inputId}
        name={props.name}
        type={type}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        required={props.required}
      />
      <label>{props.placeholder}</label>
      <div className={styles.box}>
        {!focus && props.wrong && (
          <Icon path={mdiAlphaXCircleOutline} size={1} verticle color="red" />
        )}
        {props.correct && (
          <Icon path={mdiCheckCircleOutline} size={1} verticle color="green" />
        )}
        {props.type === "password" && props.value !== "" && (
          <button type="button" onClick={handleChange}>
            {text}
          </button>
        )}
      </div>
    </div>
  );
}
