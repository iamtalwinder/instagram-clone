import React from "react";
import DashboardContainer from "./DashboardContainer";
import BottomNav from "./BottomNav";
import PageModal from "./PageModal";
import Post from "./Post";

export default function PhotoModal({ postIndex, setOpenModal }) {
  const closePhotoModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <PageModal setOpenModal={setOpenModal} title="Photo">
        <DashboardContainer style={{ margin: "15px auto 75px auto" }}>
          <Post postIndex={postIndex} closePhotoModal={closePhotoModal} />
        </DashboardContainer>
        <BottomNav />
      </PageModal>
    </>
  );
}
