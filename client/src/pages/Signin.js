import React, { useState } from "react";
import styles from "./Signin.module.css";
import FormInput from "../components/FormInput";
import Button from "../components/Button";
import FormDivider from "../components/FormDivider";
import IconButton from "../components/IconButton";
import AppInfo from "../components/AppInfo";
import { mdiFacebook } from "@mdi/js";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    checkDisabled(e.target.value, password);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    checkDisabled(email, e.target.value);
  };

  const checkDisabled = (email, password) => {
    if (email === "" || password === "") {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  };
  return (
    <div className={styles.topContainer}>
      <form className={styles.form}>
        <h4>Instagram</h4>
        <FormInput
          name="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmail}
          required
        />
        <FormInput
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePassword}
          required
        />
        <Button
          type="submit"
          loading={loading}
          disabled={disabled}
          onClick={handleSubmit}
          style={{ marginTop: "12px" }}
        >
          Log In
        </Button>
        <FormDivider style={{ marginTop: "20px" }} />
        <IconButton style={{ padding: "0" }} path={mdiFacebook} type="button">
          Log In with Facebook
        </IconButton>
        <Button
          style={{
            background: "none",
            color: "#00376b",
            fontSize: "12px",
          }}
          type="button"
        >
          Forgot Password?
        </Button>
      </form>
      <div className={styles.signup}>
        <p>Don't have an account?</p>
        <Button
          style={{
            background: "none",
            color: "#0095f6",
            padding: "0",
            width: "fit-content",
          }}
        >
          Sign up
        </Button>
      </div>
      <AppInfo />
    </div>
  );
}
