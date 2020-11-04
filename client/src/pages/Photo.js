import React from "react";
import Nav from "../components/Nav";
import DashboardContainer from "../components/DashboardContainer";
import BottomNav from "../components/BottomNav";
import GoBack from "../components/GoBack";
import Post from "../components/Post";

export default function Photo(props) {
  return (
    <>
      <Nav topNav={true}>
        <GoBack />
        <h5
          style={{
            fontSize: "15px",
          }}
        >
          Photo
        </h5>
        <div></div>
      </Nav>
      <DashboardContainer style={{ marginTop: "55px" }}>
        <Post post={props.post} />
      </DashboardContainer>
      <BottomNav />
    </>
  );
}
