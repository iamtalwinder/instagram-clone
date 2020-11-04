import React from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Modal from "./Modal";
import Button from "./Button";
import { useToast } from "../hooks";

export default function DeletePostModal(props) {
  const toast = useToast();

  const history = useHistory();

  const deletePost = async () => {
    try {
      const response = await axios.delete("api/post", {
        params: { postId: props.postId },
      });

      toast.open({
        type: "info",
        message: response.data.msg,
      });

      history.replace("/home");
      history.goBack();
    } catch (err) {
      console.log(err);
      toast.open({
        type: "error",
        message: "Something went wrong",
      });
    }
  };
  return (
    <Modal
      setOpenModal={props.setOpenModal}
      style={{ width: "250px", height: "80px" }}
    >
      <Button style={{ color: "red" }} onClick={deletePost}>
        Delete
      </Button>
    </Modal>
  );
}
