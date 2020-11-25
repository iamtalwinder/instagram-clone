import React from "react";
import axios from "axios";
import Button from "./Button";
import Modal from "./Modal";
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
      <div>
        <h3>Log Out?</h3>
        <p>Are you sure you want to log out of your account?</p>
      </div>

      <Button style={{ color: "#0095f6" }} onClick={logout}>
        Log Out
      </Button>
    </Modal>
  );
}
