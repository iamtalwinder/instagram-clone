import React, { useState } from "react";
import styles from "./Signup.module.css";
import FormInput from "../components/FormInput";
import Button from "../components/Button";
import FormDivider from "../components/FormDivider";
import IconButton from "../components/IconButton";
import FormMessageBox from "../components/FormMessageBox";
import AppInfo from "../components/AppInfo";
import { mdiFacebook } from "@mdi/js";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function Signin(props) {
  let history = useHistory();
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [signupDisable, setSignupDisable] = useState(true);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("/api/signup", {
        email,
        fullName,
        userName,
        password,
      });
      setError(false);
      setMessage(response.data.msg);
    } catch (err) {
      setError(true);
      if (err.response) {
        setMessage(err.response.data.msg);
      } else if (err.request) {
        setMessage("Something went wrong. Try again!");
      } else {
        setMessage("Network error");
      }
    }
    setLoading(false);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    checkDisable(e.target.value, fullName, userName, password);
  };

  const handleFullName = (e) => {
    setFullName(e.target.value);
    checkDisable(email, e.target.value, userName, password);
  };

  const handleUserName = (e) => {
    setUserName(e.target.value);
    checkDisable(email, fullName, e.target.value, password);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    checkDisable(email, fullName, userName, e.target.value);
  };

  const checkDisable = (email, fullName, userName, password) => {
    if (email === "" || fullName === "" || userName === "" || password === "") {
      setSignupDisable(true);
    } else {
      setSignupDisable(false);
    }
  };
  return (
    <div className={styles.topContainer}>
      <form className={styles.form}>
        <h4>Instagram</h4>
        <p className={styles.subHeading}>
          Sign up to see photos and videos from your friends.
        </p>
        <IconButton
          style={{
            color: "#ffffff",
            background: "#0095f6",
            marginTop: "5px",
          }}
          path={mdiFacebook}
          type="button"
        >
          Log In with Facebook
        </IconButton>
        <FormDivider style={{ margin: "25px 0 0 0" }} />
        <FormInput
          name="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmail}
          required
        />
        <FormInput
          name="fullName"
          type="text"
          placeholder="Fullname"
          value={fullName}
          onChange={handleFullName}
          required
        />
        <FormInput
          name="userName"
          type="text"
          placeholder="Username"
          value={userName}
          onChange={handleUserName}
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
          disabled={signupDisable}
          onClick={handleSubmit}
          style={{ marginTop: "12px" }}
        >
          Sign up
        </Button>

        {message !== "" && (
          <FormMessageBox
            message={message}
            error={error}
            style={{ marginTop: "20px" }}
          />
        )}

        <p className={styles.policy}>
          By signing up, you agree to our Terms , Data Policy and Cookies Policy
          .
        </p>
      </form>
      <div className={styles.signin}>
        <p>Have an account?</p>
        <Button
          style={{
            background: "none",
            color: "#0095f6",
            padding: "0",
            width: "fit-content",
          }}
          onClick={() => history.push("/")}
        >
          Log in
        </Button>
      </div>
      <AppInfo />
    </div>
  );
}
