import React, { useContext } from "react";
import axios from "axios";
import styles from "./UnfollowModal.module.css";
import DpPreview from "./DpPreview";
import Button from "./Button";
import { VisitedUserContext } from "../context/VisitedUser";

export default function UnfollowModal(props) {
  const [visitedUser, setVisitedUser] = useContext(VisitedUserContext);

  const unfollow = async () => {
    props.setLoading(true);
    props.setOpenModal(false);
    try {
      await axios.delete("/api/unfollow", {
        params: { userToUnfollow: visitedUser.userId },
      });

      setVisitedUser((prevState) => {
        return {
          ...prevState,
          followers: --prevState.followers,
          isFollowing: false,
        };
      });
    } catch (err) {
      console.log(err.response);
      alert("Something went wrong!");
    }
    props.setLoading(false);
  };

  const closeModel = (e) => {
    const id = e.target.id;
    if (id === "cancle" || id === "container") {
      props.setOpenModal(false);
    }
  };

  const buttonStyles = {
    background: "none",
    borderRadius: "none",
    borderTop: "1px solid #ccc",
    padding: "10px",
  };

  return (
    <div className={styles.container} id="container" onClick={closeModel}>
      <div className={styles.modelContent}>
        <div className={styles.dp}>
          <DpPreview
            dpPath={visitedUser.dpPath}
            style={{
              margin: "auto",
            }}
          />
          <p>unfollow @{visitedUser.username}</p>
        </div>
        <div>
          <Button style={{ ...buttonStyles, color: "red" }} onClick={unfollow}>
            Unfollow
          </Button>
          <Button
            style={{
              ...buttonStyles,
              color: "black",
            }}
            id="cancle"
            onClick={closeModel}
          >
            Cancle
          </Button>
        </div>
      </div>
    </div>
  );
}
