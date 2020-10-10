import React from "react";
import styles from "./AppInfo.module.css";
import Button from "./Button";
import AppStore from "../img/App-store.png";
import GooglePlay from "../img/Google-play.png";

export default function AppInfo() {
  return (
    <div className={styles.appInfo}>
      <p>Get the app:</p>
      <div className={styles.appButtons}>
        <Button
          style={{
            background: "none",
            padding: "0",
            width: "fit-content",
            marginRight: "10px",
          }}
        >
          <img className={styles.logoImg} src={AppStore} alt="App store" />
        </Button>

        <Button
          style={{
            background: "none",
            padding: "0",
            width: "fit-content",
          }}
        >
          <img className={styles.logoImg} src={GooglePlay} alt="Google Play" />
        </Button>
      </div>
    </div>
  );
}
