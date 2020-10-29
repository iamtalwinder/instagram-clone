import React from "react";
import Modal from "./Modal";
import Button from "./Button";
import styles from "./DpModal.module.css";

export default function UnfollowModal(props) {
  return (
    <Modal
      setOpenModal={props.setOpenModal}
      style={{ width: "250px", height: "200px" }}
    >
      <h3 className={styles.heading}>Change Profile Photo</h3>

      <Button style={{ color: "#0095f6" }}>Upload Photo</Button>

      <Button style={{ color: "red" }}>Remove Current Photo</Button>
    </Modal>
  );
}
