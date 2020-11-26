import React from "react";
import styles from "./LogoutModal.module.css";
import axios from "axios";
import Modal from "./Modal";
import ModalButton from "./ModalButton";
import { useToast } from "../hooks";
import { useHistory } from "react-router-dom";

export default function LogoutModal({ openModal, setOpenModal }) {
  const toast = useToast();
  const history = useHistory();

  const logout = async () => {
    try {
      await axios.delete("/api/signout");
      history.push("/");
    } catch (err) {
      console.log(err.response);

      toast.open({
        type: "error",
        message: "Something went wrong. Try again!",
      });
    }
  };

  return (
    <Modal openModal={openModal} setOpenModal={setOpenModal}>
      <div className={styles.heading}>
        <h3>Log Out?</h3>
        <p>Are you sure you want to log out of your account?</p>
      </div>

      <ModalButton style={{ color: "#0095f6" }} onClick={logout}>
        Log Out
      </ModalButton>
      <ModalButton onClick={() => setOpenModal(false)}>cancle</ModalButton>
    </Modal>
  );
}
