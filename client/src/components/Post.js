import React, { useState, useContext } from "react";
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

export default function Post({ postIndex, closePhotoModal }) {
  const ICON_SIZE = 1.2;

  const LoggedInUser = useContext(LoggedInUserContext)[0];
  const [posts, dispatchPosts] = useContext(PostsContext);

  const [openDeletePostModal, setOpenDeletePostModal] = useState(false);
  const [openCommentModal, setOpenCommentModal] = useState(false);
  const [openLikesModal, setOpenLikesModal] = useState(false);

  const post = posts[postIndex];

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
        type: PostsActionTypes.INCREMENT_LIKES,
        postIndex: postIndex,
      });
      await axios.post("/api/like", { postId: post.postId });
    } catch (err) {
      console.log(err.response);

      dispatchPosts({
        type: PostsActionTypes.DECREMENT_LIKES,
        postIndex: postIndex,
      });
    }
  };

  const unlike = async () => {
    try {
      dispatchPosts({
        type: PostsActionTypes.DECREMENT_LIKES,
        postIndex: postIndex,
      });
      await axios.delete("/api/unlike", { params: { postId: post.postId } });
    } catch (err) {
      console.log(err.response);

      dispatchPosts({
        type: PostsActionTypes.INCREMENT_LIKES,
        postIndex: postIndex,
      });
    }
  };

  return (
    <div className={styles.post}>
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

      {openCommentModal && (
        <CommentModal
          postId={post.postId}
          setOpenModal={setOpenCommentModal}
          postIndex={postIndex}
        />
      )}

      {openLikesModal && (
        <LikesModal postId={post.postId} setOpenModal={setOpenLikesModal} />
      )}
    </div>
  );
}
