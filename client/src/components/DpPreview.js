import React from "react";
import styles from "./DpPreview.module.css";
import dp from "../img/dp.jpeg";

export default function DpPreview(props) {
  let dpPath = props.dpPath;

  if (dpPath) {
    dpPath += ".jpeg";
  }

  return (
    <img className={styles.img} style={props.style} src={dpPath || dp} alt="" />
  );
}
