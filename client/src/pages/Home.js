import React from "react";
import Nav from "../components/Nav";
import DashboardContainer from "../components/DashboardContainer";
import BottomNav from "../components/BottomNav";
import Icon from "@mdi/react";
import { mdiCameraOutline, mdiSendOutline } from "@mdi/js";
import EmptyButton from "../components/EmptyButton";

export default function Home() {
  const ICON_SIZE = 1.4;
  return (
    <>
      <Nav topNav={true}>
        <EmptyButton>
          <Icon path={mdiCameraOutline} size={ICON_SIZE} verticle="true" />
        </EmptyButton>
        <h5
          style={{
            fontFamily: "Yesteryear",
            fontSize: "30px",
          }}
        >
          Instagram
        </h5>
        <EmptyButton>
          <Icon
            path={mdiSendOutline}
            size={ICON_SIZE}
            verticle="true"
            rotate={-45}
          />
        </EmptyButton>
      </Nav>
      <DashboardContainer></DashboardContainer>
      <BottomNav active="home" />
    </>
  );
}
