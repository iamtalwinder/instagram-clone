import React from "react";
import Nav from "../components/Nav";
import DashboardContainer from "../components/DashboardContainer";
import BottomNav from "../components/BottomNav";
import Icon from "@mdi/react";
import { mdiCameraOutline, mdiSendOutline } from "@mdi/js";

export default function Home() {
  const ICON_SIZE = 1.4;
  return (
    <>
      <Nav topNav={true}>
        <button>
          <Icon path={mdiCameraOutline} size={ICON_SIZE} verticle="true" />
        </button>
        <h5
          style={{
            fontFamily: "Yesteryear",
            fontSize: "30px",
          }}
        >
          Instagram
        </h5>
        <button>
          <Icon
            path={mdiSendOutline}
            size={ICON_SIZE}
            verticle="true"
            rotate={-45}
          />
        </button>
      </Nav>
      <DashboardContainer></DashboardContainer>
      <BottomNav active="home" />
    </>
  );
}
