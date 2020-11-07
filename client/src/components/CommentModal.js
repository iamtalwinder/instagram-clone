import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import styles from "./CommentModal.module.css";
import PageModal from "./PageModal";
import { useToast } from "../hooks";
import DpThumb from "../components/DpThumb";
import { Context as LoggedInUserContext } from "../context/LoggedInUser";
import TextButton from "./TextButton";
import ToAccount from "./ToAccount";

export default function CommentModal(props) {
  const [loading, setLoading] = useState(true);
  const [postDisabled, setPostDisabled] = useState(true);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const toast = useToast();

  const loggedInUser = useContext(LoggedInUserContext)[0];

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
            postId: props.postId,
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
  }, [props.postId, toast]);

  const postComment = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("/api/comment", {
        postId: props.postId,
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
      props.setPost((post) => {
        return {
          ...post,
          comments: post.comments + 1,
        };
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
      setOpenModal={props.setOpenModal}
      title="Comments"
      loading={loading}
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
