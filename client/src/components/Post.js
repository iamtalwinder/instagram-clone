import React, { useRef, useState, useContext } from "react";
import styles from "./Post.module.css";
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
import {
  Context as PostsContext,
  actionTypes as PostsActionTypes,
} from "../context/Posts";
import EmptyButton from "../components/EmptyButton";
import DeletePostModal from "../components/DeletePostModal";
import CommentModal from "../components/CommentModal";
import LikesModal from "../components/LikesModal";

export default function Post({ postIndex, closePhotoModal, style }) {
  const ICON_SIZE = 1.2;

  const LoggedInUser = useContext(LoggedInUserContext)[0];
  const [posts, dispatchPosts] = useContext(PostsContext);

  const [openDeletePostModal, setOpenDeletePostModal] = useState(false);
  const [openCommentModal, setOpenCommentModal] = useState(false);
  const [openLikesModal, setOpenLikesModal] = useState(false);

  const post = posts[postIndex];
  const heart = useRef(null);

  const changeLike = () => {
    if (post.isLiked) {
      unlike();
    } else {
      like();
    }
  };

  const like = async () => {
    try {
      dispatchPosts({
        type: PostsActionTypes.LIKE,
        postIndex: postIndex,
      });
      await axios.post("/api/like", { postId: post.postId });
    } catch (err) {
      console.log(err.response);

      if (err.response.status !== 409) {
        dispatchPosts({
          type: PostsActionTypes.UNLIKE,
          postIndex: postIndex,
        });
      }
    }
  };

  const unlike = async () => {
    try {
      dispatchPosts({
        type: PostsActionTypes.UNLIKE,
        postIndex: postIndex,
      });
      await axios.delete("/api/unlike", { params: { postId: post.postId } });
    } catch (err) {
      console.log(err.response);

      dispatchPosts({
        type: PostsActionTypes.LIKE,
        postIndex: postIndex,
      });
    }
  };

  const handleDoubleTap = () => {
    heart.current.style.animationName = styles.like;
    const end = () => {
      heart.current.style.animationName = "";
    };
    heart.current.addEventListener("webkitAnimationEnd", end);
    heart.current.addEventListener("animationend", end);
    like();
  };

  if (!post) {
    return <></>;
  }

  return (
    <div className={styles.post} style={style}>
      <div className={styles.header}>
        <ToAccount
          includeDP={true}
          userId={post.userId}
          username={post.username}
          dpPath={post.dpPath}
        />
        {LoggedInUser.userId === post.userId && (
          <EmptyButton onClick={() => setOpenDeletePostModal(true)}>
            <Icon path={mdiDotsHorizontal} size={ICON_SIZE} verticle="true" />
          </EmptyButton>
        )}
      </div>
      <div onDoubleClick={handleDoubleTap} className={styles.imgContainer}>
        <img src={`${post.path}.jpeg`} alt="" />
        <Icon
          path={mdiHeart}
          size={2}
          color="white"
          className={styles.heart}
          ref={heart}
          verticle="true"
        />
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
          <EmptyButton
            style={{ marginLeft: "5px" }}
            onClick={() => {
              setOpenCommentModal(true);
            }}
          >
            <Icon path={mdiCommentOutline} size={ICON_SIZE} verticle="true" />
          </EmptyButton>
        </div>
      </div>

      <div className={styles.infoContainer}>
        {post.likes !== 0 && (
          <EmptyButton
            style={{ color: "#706868", fontSize: "14px", marginBottom: "5px" }}
            onClick={() => {
              setOpenLikesModal(true);
            }}
          >
            View {millify(post.likes)} like{post.likes > 1 && "s"}
          </EmptyButton>
        )}

        {post.comments !== 0 && (
          <EmptyButton
            style={{ color: "#706868", fontSize: "14px" }}
            onClick={() => {
              setOpenCommentModal(true);
            }}
          >
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

      <DeletePostModal
        postId={post.postId}
        openModal={openDeletePostModal}
        setOpenModal={setOpenDeletePostModal}
        postIndex={postIndex}
        closePhotoModal={closePhotoModal}
      />

      <CommentModal
        postId={post.postId}
        openModal={openCommentModal}
        setOpenModal={setOpenCommentModal}
        postIndex={postIndex}
      />

      <LikesModal
        postId={post.postId}
        openModal={openLikesModal}
        setOpenModal={setOpenLikesModal}
      />
    </div>
  );
}
