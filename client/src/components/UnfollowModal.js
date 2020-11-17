import React from "react";
import axios from "axios";
import styles from "./UnfollowModal.module.css";
import DpPreview from "./DpPreview";
import Button from "./Button";
import Modal from "./Modal";
import { useToast } from "../hooks";

export default function UnfollowModal({
  userId,
  username,
  dpPath,
  dispatch,
  actionTypes,
  setLoading,
  openModal,
  setOpenModal,
}) {
  const toast = useToast();

  const unfollow = async () => {
    setLoading(true);
    setOpenModal(false);
    try {
      await axios.delete("/api/unfollow", {
        params: { userToUnfollow: userId },
      });

      dispatch({ type: actionTypes.UNFOLLOW });
    } catch (err) {
      console.log(err.response);

      toast.open({
        type: "error",
        message: "Something went wrong. Try again!",
      });
    }
    setOpenModal(false);
    setLoading(false);
  };

  return (
    <Modal openModal={openModal} setOpenModal={setOpenModal}>
      <div className={styles.dp}>
        <DpPreview
          dpPath={dpPath}
          style={{
            margin: "auto",
          }}
        />
        <p>unfollow @{username}</p>
      </div>

      <Button style={{ color: "red" }} onClick={unfollow}>
        Unfollow
      </Button>
    </Modal>
  );
}
