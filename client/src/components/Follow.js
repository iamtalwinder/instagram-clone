import React, { useState } from "react";
import axios from "axios";
import Button from "./Button";
import UnfollowModal from "./UnfollowModal";

export default function Follow({ user, dispatch, actionTypes }) {
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const follow = async () => {
    setLoading(true);
    try {
      await axios.post("/api/follow", { userToFollow: user.userId });

      dispatch({ type: actionTypes.FOLLOW });
    } catch (err) {
      console.log(err);
      alert("Something went wrong!");
    }
    setLoading(false);
  };

  return (
    <>
      {user.isFollowing ? (
        <Button
          style={{
            color: "black",
            background: "white",
            border: "1px solid #ccc",
          }}
          loading={loading}
          onClick={() => {
            setOpenModal(true);
          }}
        >
          Following
        </Button>
      ) : (
        <Button loading={loading} onClick={follow}>
          Follow
        </Button>
      )}
      {openModal && (
        <UnfollowModal
          user={user}
          dispatch={dispatch}
          actionTypes={actionTypes}
          setOpenModal={setOpenModal}
          setLoading={setLoading}
        />
      )}
    </>
  );
}
