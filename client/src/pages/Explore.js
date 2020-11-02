import React from "react";
import Nav from "../components/Nav";
import DashboardContainer from "../components/DashboardContainer";
import BottomNav from "../components/BottomNav";

export default function Explore() {
  return (
    <>
      <Nav topNav={true}>
        <div></div>
        <h5 style={{ fontSize: "15px" }}>Explore</h5>
        <div></div>
      </Nav>
      <DashboardContainer></DashboardContainer>
      <BottomNav active="explore" />
    </>
  );
}
