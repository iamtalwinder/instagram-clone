import React, { useState, useContext } from "react";
import styles from "./Signin.module.css";
import FormInput from "../components/FormInput";
import Button from "../components/Button";
import TextButton from "../components/TextButton";
import FormDivider from "../components/FormDivider";
import IconButton from "../components/IconButton";
import FormMessageBox from "../components/FormMessageBox";
import AppInfo from "../components/AppInfo";
import { mdiFacebook } from "@mdi/js";
import axios from "axios";
import { useHistory } from "react-router-dom";
import {
  Context as LoggedInUserContext,
  actionTypes as LoggedInUserActionTypes,
} from "../context/LoggedInUser";
import FacebookRedirect from "../components/FacebookRedirect";

export default function Signin() {
  const history = useHistory();

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginDisable, setLoginDisable] = useState(true);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  const loggedInUserDispatch = useContext(LoggedInUserContext)[1];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post("/api/signin", { user, password });

      loggedInUserDispatch({
        type: LoggedInUserActionTypes.SET_USER,
        user: data.user,
      });

      history.push("/home");
    } catch (err) {
      setError(true);
      setLoading(false);
      if (err.response) {
        setMessage(err.response.data.msg);
      } else {
        setMessage("Something went wrong. Try again!");
      }
    }
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
        <FacebookRedirect disabled={loading}>
          <IconButton
            style={{ padding: "0" }}
            path={mdiFacebook}
            type="button"
            onClick={() => setLoading(true)}
          >
            Log In with Facebook
          </IconButton>
        </FacebookRedirect>
        {message !== "" && (
          <FormMessageBox
            message={message}
            error={error}
            style={{ marginTop: "" }}
          />
        )}
        <TextButton
          style={{
            color: "#00376b",
            fontSize: "12px",
          }}
          type="button"
        >
          Forgot Password?
        </TextButton>
      </form>
      <div className={styles.signup}>
        <p>Don't have an account?</p>
        <TextButton disabled={loading} onClick={() => history.push("/signup")}>
          Sign up
        </TextButton>
      </div>
      <AppInfo />
    </div>
  );
}
