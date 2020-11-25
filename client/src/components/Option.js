import React from "react";
import styles from "./Option.module.css";
import Icon from "@mdi/react";
import { mdiChevronRight } from "@mdi/js";

export default function Option({
  text,
  disabled,
  style,
  onClick,
  includeIcon = true,
}) {
  return (
    <button
      className={disabled ? styles.disabled : styles.active}
      disabled={disabled}
      style={style}
      onClick={onClick}
    >
      <p>{text} </p>
      {includeIcon && (
        <Icon
          path={mdiChevronRight}
          size={1.2}
          verticle="true"
          color="#8e8e8e"
        />
      )}
    </button>
  );
}
