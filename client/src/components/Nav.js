import React from "react";
import styles from "./Nav.module.css";

export default function Nav(props) {
  let style = {};
  const topStyle = {
    borderBottom: "1px solid #cfccca",
    top: "0",
    padding: "0 10px",
    justifyContent: "space-between",
  };

  const bottomStyle = {
    bottom: "0",
    borderTop: "1px solid #cfccca",
    justifyContent: "space-around",
  };

  if (props.topNav) {
    style = topStyle;
  } else if (props.bottomNav) {
    style = bottomStyle;
  }

  if (props.itemsCenter) {
    style.justifyContent = "center";
  }
  return (
    <div className={styles.nav} style={style}>
      {props.children}
    </div>
  );
}
