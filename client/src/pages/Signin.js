import React, { useState } from "react";
import styles from "./Signin.module.css";
import FormInput from "../components/FormInput";
import Button from "../components/Button";
import FormDivider from "../components/FormDivider";
import IconButton from "../components/IconButton";
import FormErrorBox from "../components/FormErrorBox";
import AppInfo from "../components/AppInfo";
import { mdiFacebook } from "@mdi/js";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function Signin(props) {
  let history = useHistory();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginDisable, setLoginDisable] = useState(true);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("/api/signin", { user, password });
      history.push("/dashboard");
    } catch (err) {
      if (err.response) {
        setError(err.response.data.msg);
      } else if (err.request) {
        setError("Something went wrong. Try again!");
      } else {
        setError("Network error");
      }
    }
    setLoading(false);
  };

  const handleUser = (e) => {
    setUser(e.target.value);
    checkDisable(e.target.value, password);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    checkDisable(user, e.target.value);
  };

  const checkDisable = (user, password) => {
    if (user === "" || password === "") {
      setLoginDisable(true);
    } else {
      setLoginDisable(false);
    }
  };
  return (
    <div className={styles.topContainer}>
      <form className={styles.form}>
        <h4>Instagram</h4>
        <FormInput
          name="user"
          type="text"
          placeholder="Username or email"
          value={user}
          onChange={handleUser}
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
          disabled={loginDisable}
          onClick={handleSubmit}
          style={{ marginTop: "12px" }}
        >
          Log In
        </Button>
        <FormDivider style={{ marginTop: "20px" }} />
        <IconButton style={{ padding: "0" }} path={mdiFacebook} type="button">
          Log In with Facebook
        </IconButton>
        {error !== "" && <FormErrorBox error={error} />}
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
          onClick={() => history.push("/signup")}
        >
          Sign up
        </Button>
      </div>
      <AppInfo />
    </div>
  );
}
