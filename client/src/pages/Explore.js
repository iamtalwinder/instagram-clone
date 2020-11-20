import React from "react";
import Nav from "../components/Nav";
import DashboardContainer from "../components/DashboardContainer";
import BottomNav from "../components/BottomNav";
import { ContextProvider as PostsContextProvider } from "../context/Posts";
import Posts from "../components/Posts";

export default function Explore() {
  return (
    <>
      <Nav topNav={true}>
        <div></div>
        <h5 style={{ fontSize: "15px" }}>Explore</h5>
        <div></div>
      </Nav>
      <DashboardContainer>
        <PostsContextProvider>
          <Posts postsPerPage={30} />
        </PostsContextProvider>
      </DashboardContainer>
      <BottomNav active="explore" />
    </>
  );
}
