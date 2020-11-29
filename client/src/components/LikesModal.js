import React, { useState, useEffect, useContext, useReducer } from "react";
import styles from "./LikesModal.module.css";
import axios from "axios";
import PageModal from "./PageModal";
import { useToast } from "../hooks";
import ToAccount from "./ToAccount";
import Follow from "./Follow";
import { Context as LoggedInUserContext } from "../context/LoggedInUser";

function Liker({ userId, dpPath, username, isFollowing }) {
  const loggedInUser = useContext(LoggedInUserContext)[0];

  const actionTypes = {
    FOLLOW: "FOLLOW",
    UNFOLLOW: "UNFOLLOW",
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case actionTypes.FOLLOW:
        return { isFollowing: true };

      case actionTypes.UNFOLLOW:
        return { isFollowing: false };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, { isFollowing: isFollowing });
  return (
    <div className={styles.liker}>
      <ToAccount
        userId={userId}
        includeDP={true}
        dpPath={dpPath}
        username={username}
      />

      <div>
        {loggedInUser.userId !== userId && (
          <Follow
            userId={userId}
            username={username}
            dpPath={dpPath}
            isFollowing={state.isFollowing}
            dispatch={dispatch}
            actionTypes={actionTypes}
          />
        )}
      </div>
    </div>
  );
}

export default function LikersModal({ postId, openModal, setOpenModal }) {
  const [loading, setLoading] = useState(true);
  const [likers, setLikers] = useState([]);

  const toast = useToast();

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const response = await axios.get("api/likers", {
          params: {
            postId: postId,
          },
        });

        setLikers(response.data.likers);
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
  }, [postId, toast, openModal]);
  return (
    <PageModal
      openModal={openModal}
      setOpenModal={setOpenModal}
      title="Likes"
      loading={loading}
      animation="left-in"
    >
      <div className={styles.container}>
        {likers.map((liker) => (
          <Liker
            userId={liker.userId}
            dpPath={liker.dpPath}
            username={liker.username}
            isFollowing={liker.isFollowing}
            key={liker.userId}
          />
        ))}
      </div>
    </PageModal>
  );
}
