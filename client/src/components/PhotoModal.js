import React from "react";
import DashboardContainer from "./DashboardContainer";
import BottomNav from "./BottomNav";
import PageModal from "./PageModal";
import Post from "./Post";

export default function PhotoModal(props) {
  console.log(props.post);
  return (
    <>
      <PageModal setOpenModal={props.setOpenModal} title="Photo">
        <DashboardContainer style={{ marginTop: "55px" }}>
          <Post post={props.post} />
        </DashboardContainer>
        <BottomNav />
      </PageModal>
    </>
  );
}
