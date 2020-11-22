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
  fullname,
  dpWidth,
  dpHeight,
  text,
}) {
  const history = useHistory();

  return (
    <div className={styles.container} style={style}>
      <EmptyButton
        style={{
          display: "inline-flex",
          marginRight: "5px",
          fontSize: "14px",
        }}
        onClick={() => {
          history.push({
            pathname: "/account",
            state: { userId: userId },
          });
        }}
      >
        {includeDP && (
          <DpThumb
            style={{
              width: dpWidth || "25px",
              height: dpHeight || "25px",
              marginRight: "10px",
            }}
            dpPath={dpPath}
          />
        )}
        <div>
          <p className={styles.username}>{username}</p>
          {fullname && <p className={styles.fullname}>{fullname}</p>}
        </div>
      </EmptyButton>
      <span className={styles.text}>{text}</span>
    </div>
  );
}
