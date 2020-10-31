import React, { useState, useEffect, useRef } from "react";
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

  const container = useRef(null);
  const input = useRef(null);

  useEffect(() => {
    input.current.addEventListener("focus", () => {
      container.current.style.borderColor = "#262626";
      setFocus(true);
    });

    input.current.addEventListener("blur", () => {
      container.current.style.borderColor = "#cfccca";
      setFocus(false);
    });
  }, []);

  return (
    <div className={styles.container} ref={container}>
      <input
        ref={input}
        className={styles.input}
        name={props.name}
        type={type}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        required={props.required}
      />
      <label className={styles.label}>{props.placeholder}</label>
      <div className={styles.box}>
        {!focus && props.wrong && (
          <Icon
            path={mdiAlphaXCircleOutline}
            size={1}
            verticle="true"
            color="red"
          />
        )}
        {props.correct && (
          <Icon
            path={mdiCheckCircleOutline}
            size={1}
            verticle="true"
            color="green"
          />
        )}
        {props.type === "password" && props.value !== "" && (
          <button
            className={styles.button}
            type="button"
            onClick={handleChange}
          >
            {text}
          </button>
        )}
      </div>
    </div>
  );
}
