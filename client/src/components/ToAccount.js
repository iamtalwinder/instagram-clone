import React from "react";
import styles from "./ToAccount.module.css";
import { useHistory } from "react-router-dom";
import DpThumb from "./DpThumb";
import EmptyButton from "./EmptyButton";

export default function ToAccount({
  style,
  userId,
  includeDP,
  dpPath,
  username,
  text,
}) {
  const history = useHistory();

  return (
    <div className={styles.container} style={style}>
      <EmptyButton
        style={{ display: "flex" }}
        onClick={() => {
          history.push({
            pathname: "/account",
            state: { userId: userId },
          });
        }}
      >
        {includeDP && (
          <DpThumb
            style={{ height: "25px", width: "25px", marginRight: "10px" }}
            dpPath={dpPath}
          />
        )}
        <p className={styles.username}>{username}</p>
      </EmptyButton>
      <p className={styles.text}>{text}</p>
    </div>
  );
}
