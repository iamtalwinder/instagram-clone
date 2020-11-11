import React from "react";
import axios from "axios";
import styles from "./UnfollowModal.module.css";
import DpPreview from "./DpPreview";
import Button from "./Button";
import Modal from "./Modal";

export default function UnfollowModal({
  user,
  dispatch,
  actionTypes,
  setLoading,
  setOpenModal,
}) {
  const unfollow = async () => {
    setLoading(true);
    setOpenModal(false);
    try {
      await axios.delete("/api/unfollow", {
        params: { userToUnfollow: user.userId },
      });

      dispatch({ type: actionTypes.UNFOLLOW });
    } catch (err) {
      console.log(err.response);
      alert("Something went wrong!");
    }
    setLoading(false);
  };

  return (
    <Modal setOpenModal={setOpenModal}>
      <div className={styles.dp}>
        <DpPreview
          dpPath={user.dpPath}
          style={{
            margin: "auto",
          }}
        />
        <p>unfollow @{user.username}</p>
      </div>

      <Button style={{ color: "red" }} onClick={unfollow}>
        Unfollow
      </Button>
    </Modal>
  );
}
