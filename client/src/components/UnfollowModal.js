import React, { useContext } from "react";
import axios from "axios";
import styles from "./UnfollowModal.module.css";
import DpPreview from "./DpPreview";
import Button from "./Button";
import Modal from "./Modal";
import {
  Context as VisitedUserContext,
  actionTypes as VisitedUserActionTypes,
} from "../context/VisitedUser";

export default function UnfollowModal(props) {
  const [visitedUser, visitedUserDispatch] = useContext(VisitedUserContext);

  const unfollow = async () => {
    props.setLoading(true);
    props.setOpenModal(false);
    try {
      await axios.delete("/api/unfollow", {
        params: { userToUnfollow: visitedUser.userId },
      });

      visitedUserDispatch({ type: VisitedUserActionTypes.UNFOLLOW });
    } catch (err) {
      console.log(err.response);
      alert("Something went wrong!");
    }
    props.setLoading(false);
  };

  return (
    <Modal setOpenModal={props.setOpenModal}>
      <div className={styles.dp}>
        <DpPreview
          dpPath={visitedUser.dpPath}
          style={{
            margin: "auto",
          }}
        />
        <p>unfollow @{visitedUser.username}</p>
      </div>

      <Button style={{ color: "red" }} onClick={unfollow}>
        Unfollow
      </Button>
    </Modal>
  );
}
