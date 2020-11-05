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
import millify from "millify";
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
        return { ...post, likes: post.likes + 1, isLiked: true };
      });
      await axios.post("/api/like", { postId: post.postId });
    } catch (err) {
      setPost((post) => {
        return { ...post, likes: post.likes - 1, isLiked: false };
      });
    }
  };

  const unlike = async () => {
    try {
      setPost((post) => {
        return { ...post, likes: post.likes - 1, isLiked: false };
      });
      await axios.delete("/api/unlike", { params: { postId: post.postId } });
    } catch (err) {
      setPost((post) => {
        return { ...post, likes: post.likes + 1, isLiked: true };
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
              color={post.isLiked ? "red" : "black"}
              verticle="true"
            />
          </EmptyButton>
          <EmptyButton style={{ marginLeft: "5px" }}>
            <Icon path={mdiCommentOutline} size={ICON_SIZE} verticle="true" />
          </EmptyButton>
        </div>
      </div>

      <div className={styles.infoContainer}>
        {post.likes !== 0 && (
          <EmptyButton style={{ color: "#706868", fontSize: "14px" }}>
            View {millify(post.likes)} like{post.likes > 1 && "s"}
          </EmptyButton>
        )}

        {post.comments !== 0 && (
          <EmptyButton style={{ color: "#706868", fontSize: "14px" }}>
            View {millify(post.comments)} comment{post.comments > 1 && "s"}
          </EmptyButton>
        )}

        <div className={styles.caption}>
          {post.caption === "null" ? (
            ""
          ) : (
            <ToAccount
              userId={post.userId}
              username={post.username}
              text={post.caption}
            />
          )}
        </div>
      </div>

      {openModal && (
        <DeletePostModal postId={post.postId} setOpenModal={setOpenModal} />
      )}
    </div>
  );
}
