import React, { useState, useContext } from "react";
import styles from "./Post.module.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Icon from "@mdi/react";
import {
  mdiDotsHorizontal,
  mdiHeart,
  mdiHeartOutline,
  mdiCommentOutline,
} from "@mdi/js";
import ToAccount from "./ToAccount";
import { Context as LoggedInUserContext } from "../context/LoggedInUser";
import EmptyButton from "../components/EmptyButton";
import DeletePostModal from "../components/DeletePostModal";

export default function Post() {
  const ICON_SIZE = 1.2;
  const location = useLocation();

  const LoggedInUser = useContext(LoggedInUserContext)[0];
  const [post, setPost] = useState(location.state.post);
  const [openModal, setOpenModal] = useState(false);

  const changeLike = () => {
    if (post.isLiked) {
      unlike();
    } else {
      like();
    }
  };

  const like = async () => {
    try {
      setPost((post) => {
        return { ...post, isLiked: true };
      });
      await axios.post("/api/like", { postId: post.postId });
    } catch (err) {
      setPost((post) => {
        return { ...post, isLiked: false };
      });
    }
  };

  const unlike = async () => {
    try {
      setPost((post) => {
        return { ...post, isLiked: false };
      });
      await axios.delete("/api/unlike", { params: { postId: post.postId } });
    } catch (err) {
      setPost((post) => {
        return { ...post, isLiked: true };
      });
    }
  };

  return (
    <div className={styles.post}>
      <div className={styles.header}>
        <ToAccount
          userId={post.userId}
          username={post.username}
          dpPath={post.dpPath}
        />
        {LoggedInUser.userId === post.userId && (
          <EmptyButton onClick={() => setOpenModal(true)}>
            <Icon path={mdiDotsHorizontal} size={ICON_SIZE} verticle="true" />
          </EmptyButton>
        )}
      </div>
      <div className={styles.imgContainer}>
        <img src={`${post.path}.jpeg`} alt="" />
      </div>
      <div className={styles.footer}>
        <div>
          <EmptyButton onClick={changeLike}>
            <Icon
              path={post.isLiked ? mdiHeart : mdiHeartOutline}
              size={ICON_SIZE}
              color={post.isLiked && "red"}
              verticle="true"
            />
          </EmptyButton>
          <EmptyButton style={{ marginLeft: "5px" }}>
            <Icon path={mdiCommentOutline} size={ICON_SIZE} verticle="true" />
          </EmptyButton>
        </div>
      </div>

      <div className={styles.caption}>
        {post.caption === "null" ? "" : post.caption}
      </div>
      {openModal && (
        <DeletePostModal postId={post.postId} setOpenModal={setOpenModal} />
      )}
    </div>
  );
}
