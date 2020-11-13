import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import styles from "./CommentModal.module.css";
import PageModal from "./PageModal";
import { useToast } from "../hooks";
import DpThumb from "../components/DpThumb";
import { Context as LoggedInUserContext } from "../context/LoggedInUser";
import TextButton from "./TextButton";
import ToAccount from "./ToAccount";
import {
  Context as PostsContext,
  actionTypes as PostsActionTypes,
} from "../context/Posts";

export default function CommentModal({
  postId,
  postIndex,
  openModal,
  setOpenModal,
}) {
  const [loading, setLoading] = useState(true);
  const [postDisabled, setPostDisabled] = useState(true);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const toast = useToast();

  const loggedInUser = useContext(LoggedInUserContext)[0];
  const dispatchPosts = useContext(PostsContext)[1];

  const handleCommentChange = (e) => {
    if (e.target.value === "") {
      setPostDisabled(true);
    } else {
      setPostDisabled(false);
    }
    setComment(e.target.value);
  };

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/comments", {
          params: {
            postId: postId,
          },
        });

        setComments(response.data.comments);
      } catch (err) {
        console.log(err);
        toast.open({
          type: "error",
          message: "Something went wrong. Try again!",
        });
      }
      setLoading(false);
    };
    fetch();
  }, [postId, toast]);

  const postComment = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("/api/comment", {
        postId: postId,
        comment: comment,
      });

      const currentComment = {
        ...response.data,
        userId: loggedInUser.userId,
        username: loggedInUser.username,
        dpPath: loggedInUser.dpPath,
      };

      setComments((comments) => [currentComment, ...comments]);
      setComment("");

      dispatchPosts({
        type: PostsActionTypes.INCREMENT_COMMENTS,
        postIndex: postIndex,
      });
    } catch (err) {
      console.log(err);
      toast.open({
        type: "error",
        message: "Something went wrong. Try again!",
      });
    }
    setLoading(false);
  };

  return (
    <PageModal
      openModal={openModal}
      setOpenModal={setOpenModal}
      title="Comments"
      loading={loading}
      animation="left-in"
    >
      <div className={styles.container}>
        <div className={styles.postComment}>
          <DpThumb dpPath={loggedInUser.dpPath} />
          <form className={styles.form} onSubmit={postComment}>
            <textarea
              rows="3"
              placeholder="Add a comment..."
              value={comment}
              onChange={handleCommentChange}
            />
            <TextButton type="submit" disabled={postDisabled}>
              Post
            </TextButton>
          </form>
        </div>
        <div className={styles.comments}>
          {comments.map((comment) => (
            <ToAccount
              style={{
                marginBottom: "25px",
                borderBottom: "1px solid #ccc",
                padding: "10px",
              }}
              includeDP={true}
              dpPath={comment.dpPath}
              userId={comment.userId}
              username={comment.username}
              text={comment.comment}
              key={comment.commentId}
            />
          ))}
        </div>
      </div>
    </PageModal>
  );
}
