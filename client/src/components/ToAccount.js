import React from "react";
import styles from "./ToAccount.module.css";
import { useHistory } from "react-router-dom";
import DpThumb from "./DpThumb";
import EmptyButton from "./EmptyButton";

export default function ToAccount(props) {
  const history = useHistory();

  return (
    <div className={styles.container}>
      <EmptyButton
        style={{ display: "flex" }}
        onClick={() => {
          history.push({
            pathname: "/account",
            state: { userId: props.userId },
          });
        }}
      >
        {props.dpPath && (
          <DpThumb
            style={{ height: "25px", width: "25px", marginRight: "10px" }}
            dpPath={props.dpPath}
          />
        )}
        <p className={styles.username}>{props.username}</p>
      </EmptyButton>
      <p className={styles.text}>{props.text}</p>
    </div>
  );
}
