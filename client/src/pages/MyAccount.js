import React from "react";
import Icon from "@mdi/react";
import { mdiCogOutline, mdiAccountPlusOutline } from "@mdi/js";
import Nav from "../components/Nav";
import DashboardContainer from "../components/DashboardContainer";
import BottomNav from "../components/BottomNav";

export default function MyAccount(props) {
  const ICON_SIZE = 1.4;
  return (
    <>
      <Nav topNav={true}>
        <button>
          <Icon path={mdiCogOutline} size={ICON_SIZE} verticle="true" />
        </button>
        <h5 style={{ fontSize: "15px" }}>{props.account || "test"}</h5>
        <button>
          <Icon path={mdiAccountPlusOutline} size={ICON_SIZE} verticle="true" />
        </button>
      </Nav>
      <DashboardContainer></DashboardContainer>
      <BottomNav active="myAccount" />
    </>
  );
}
