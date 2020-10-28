import React, { useState, useContext } from "react";
import axios from "axios";
import Button from "./Button";
import UnfollowModal from "./UnfollowModal";
import { VisitedUserContext } from "../context/VisitedUser";

export default function Follow(props) {
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const [visitedUser, setVisitedUser] = useContext(VisitedUserContext);

  const follow = async () => {
    setLoading(true);
    try {
      await axios.post("/api/follow", { userToFollow: visitedUser.userId });

      setVisitedUser((prevState) => {
        return {
          ...prevState,
          followers: ++prevState.followers,
          isFollowing: true,
        };
      });
    } catch (err) {
      console.log(err);
      alert("Something went wrong!");
    }
    setLoading(false);
  };

  return (
    <>
      {visitedUser.isFollowing ? (
        <Button
          style={{
            color: "black",
            background: "white",
            border: "1px solid #ccc",
          }}
          loading={loading || props.loading}
          onClick={() => {
            setOpenModal(true);
          }}
        >
          Following
        </Button>
      ) : (
        <Button loading={loading || props.loading} onClick={follow}>
          Follow
        </Button>
      )}
      {openModal && (
        <UnfollowModal setOpenModal={setOpenModal} setLoading={setLoading} />
      )}
    </>
  );
}
