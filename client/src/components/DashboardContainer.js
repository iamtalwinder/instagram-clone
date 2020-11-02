import React from "react";
import styles from "./DashboardContainer.module.css";

export default function DashboardContainer(props) {
  return (
    <div className={styles.container} style={props.style}>
      {props.children}
    </div>
  );
}
