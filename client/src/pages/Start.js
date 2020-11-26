import React, { useEffect, useContext, useCallback } from "react";
import axios from "axios";
import styles from "./Start.module.css";
import instagramIcon from "../img/instagram-icon.png";
import {
  Context as LoggedInUserContext,
  actionTypes as LoggedInUserActionTypes,
} from "../context/LoggedInUser";
import { useLocation, useHistory } from "react-router-dom";
import { useToast } from "../hooks";

export default function Start() {
  const location = useLocation();
  const history = useHistory();
  const toast = useToast();
  const loggedInUserDispatch = useContext(LoggedInUserContext)[1];

  const signinSucess = useCallback(
    (user) => {
      loggedInUserDispatch({
        type: LoggedInUserActionTypes.SET_USER,
        user: user,
      });

      history.push("/home");
    },
    [loggedInUserDispatch, history]
  );

  useEffect(() => {
    const code = new URLSearchParams(location.search).get("code");
    if (code) {
      const handleLoginWithFacebook = async (code) => {
        try {
          const { data } = await axios.post("/api/login-with-facebook", {
            code,
          });
          signinSucess(data.user);
        } catch (err) {
          history.push("/signin");

          toast.open({
            type: "error",
            message: "Something went wrong. Try again!",
          });
        }
      };
      handleLoginWithFacebook(code);
    } else {
      const isSignedIn = async () => {
        try {
          const { data } = await axios.get("/api/current-user");
          signinSucess(data.user);
        } catch (err) {
          history.push("/signin");
        }
      };

      isSignedIn();
    }
  }, [location.search, history, loggedInUserDispatch, toast, signinSucess]);

  return (
    <div className={styles.container}>
      <img src={instagramIcon} alt="" />
    </div>
  );
}
