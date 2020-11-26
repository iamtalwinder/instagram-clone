import React, { useContext } from "react";
import axios from "axios";
import Modal from "./Modal";
import ModalButton from "./ModalButton";
import { useToast } from "../hooks";
import {
  Context as PostsContext,
  actionTypes as PostsActionTypes,
} from "../context/Posts";

export default function DeletePostModal({
  postId,
  postIndex,
  openModal,
  setOpenModal,
  closePhotoModal,
}) {
  const toast = useToast();

  const postsDispatch = useContext(PostsContext)[1];

  const deletePost = async () => {
    try {
      const response = await axios.delete("api/post", {
        params: { postId: postId },
      });

      toast.open({
        type: "info",
        message: response.data.msg,
      });

      postsDispatch({
        type: PostsActionTypes.DELETE_POST,
        postIndex: postIndex,
      });

      if (closePhotoModal) {
        closePhotoModal();
      }
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
      openModal={openModal}
      setOpenModal={setOpenModal}
      style={{ width: "250px" }}
    >
      <ModalButton style={{ color: "red" }} onClick={deletePost}>
        Delete
      </ModalButton>
      <ModalButton id="close-modal">cancle</ModalButton>
    </Modal>
  );
}
