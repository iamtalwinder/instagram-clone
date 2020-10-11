import React from "react";
import Nav from "../components/Nav";
import DashboardContainer from "../components/DashboardContainer";
import BottomNav from "../components/BottomNav";

export default function Activity() {
  return (
    <>
      <Nav topNav={true} itemsCenter={true}>
        <h5 style={{ fontSize: "15px" }}>Activity</h5>
      </Nav>
      <DashboardContainer></DashboardContainer>
      <BottomNav active="activity" />
    </>
  );
}
