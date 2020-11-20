import React, { useState, useContext } from "react";
import axios from "axios";
import { useLocation, useHistory } from "react-router-dom";
import styles from "./NewPost.module.css";
import Nav from "../components/Nav";
import DashboardContainer from "../components/DashboardContainer";
import GoBack from "../components/GoBack";
import TextButton from "../components/TextButton";
import DpThumb from "../components/DpThumb";
import { Context as LoggedInUserContext } from "../context/LoggedInUser";
import { useToast } from "../hooks";

export default function NewPost() {
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);
  const loggedInUser = useContext(LoggedInUserContext)[0];
  const location = useLocation();
  const history = useHistory();

  const toast = useToast();

  const share = async () => {
    setLoading(true);
    const file = location.state.img;
    const data = new FormData();
    data.append("img", file);
    data.append("caption", caption);

    try {
      const response = await axios.post("/api/post", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.open({
        type: "info",
        message: response.data.msg,
      });
    } catch (err) {
      console.log(err);

      if (err.response) {
        toast.open({
          type: "error",
          message: err.response.data.msg,
        });
      } else {
        toast.open({
          type: "error",
          message: "Something went wrong. Try again!",
        });
      }
    }
    history.push({
      pathname: "/account",
      state: { userId: loggedInUser.userId },
    });
  };

  return (
    <>
      <Nav topNav={true}>
        <GoBack disabled={loading} />
        <h5 style={{ fontSize: "15px" }}>
          {loading ? "Sharing..." : "New Post"}
        </h5>
        <TextButton disabled={loading} onClick={share}>
          Share
        </TextButton>
      </Nav>
      <DashboardContainer>
        <div className={styles.container}>
          <DpThumb dpPath={loggedInUser.dpPath} />
          <textarea
            rows="2"
            cols="50"
            placeholder="Write a caption"
            value={caption}
            onChange={(e) => {
              setCaption(e.target.value);
            }}
          />
          <img
            src={URL.createObjectURL(location.state.img)}
            alt=""
            width="50px"
            height="50px"
          />
        </div>
      </DashboardContainer>
    </>
  );
}
