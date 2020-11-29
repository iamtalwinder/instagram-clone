import React from "react";
import styles from "./DpModal.module.css";
import Modal from "./Modal";
import ModalButton from "./ModalButton";

export default function UnfollowModal({
  openModal,
  setOpenModal,
  clickFileInput,
  removeDP,
}) {
  return (
    <Modal openModal={openModal} setOpenModal={setOpenModal}>
      <h3 className={styles.heading}>Change Profile Photo</h3>

      <ModalButton style={{ color: "#0095f6" }} onClick={clickFileInput}>
        Upload Photo
      </ModalButton>

      <ModalButton style={{ color: "red" }} onClick={removeDP}>
        Remove Current Photo
      </ModalButton>

      <ModalButton onClick={() => setOpenModal(false)}>cancle</ModalButton>
    </Modal>
  );
}
