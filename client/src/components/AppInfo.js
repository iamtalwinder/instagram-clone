import React from "react";
import styles from "./AppInfo.module.css";
import Button from "./Button";
import appStore from "../img/app_store.png";
import googlePlay from "../img/google_play.png";

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
          <img className={styles.logoImg} src={appStore} alt="App store" />
        </Button>

        <Button
          style={{
            background: "none",
            padding: "0",
            width: "fit-content",
          }}
        >
          <img className={styles.logoImg} src={googlePlay} alt="Google Play" />
        </Button>
      </div>
    </div>
  );
}
