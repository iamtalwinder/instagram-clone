import React, { useEffect, useContext } from "react";
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
  useEffect(() => {
    const code = new URLSearchParams(location.search).get("code");
    if (code) {
      const handleLoginWithFacebook = async (code) => {
        try {
          const { data } = await axios.post("/api/login-with-facebook", {
            code,
          });
          loggedInUserDispatch({
            type: LoggedInUserActionTypes.SET_USER,
            user: data.user,
          });

          history.push("/home");
        } catch (err) {
          history.push("/signin");

          toast.open({
            type: "error",
            message: "Something went wrong. Try again!",
          });
        }
      };
      handleLoginWithFacebook(code);
    }
  }, [location.search, history, loggedInUserDispatch, toast]);

  return (
    <div className={styles.container}>
      <img src={instagramIcon} alt="" />
    </div>
  );
}
