import React, { useState } from "react";
import axios from "axios";
import Button from "./Button";
import UnfollowModal from "./UnfollowModal";

export default function Follow({
  userId,
  username,
  dpPath,
  isFollowing,
  dispatch,
  actionTypes,
}) {
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const follow = async () => {
    setLoading(true);
    try {
      await axios.post("/api/follow", { userToFollow: userId });

      dispatch({ type: actionTypes.FOLLOW });
    } catch (err) {
      console.log(err);
      alert("Something went wrong!");
    }
    setLoading(false);
  };

  return (
    <>
      {isFollowing ? (
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
          userId={userId}
          username={username}
          dpPath={dpPath}
          dispatch={dispatch}
          actionTypes={actionTypes}
          setOpenModal={setOpenModal}
          setLoading={setLoading}
        />
      )}
    </>
  );
}
