import React from "react";
import Nav from "./Nav";
import Icon from "@mdi/react";
import {
  mdiHome,
  mdiHomeOutline,
  mdiSearchWeb,
  mdiPlusBox,
  mdiPlusBoxOutline,
  mdiHeart,
  mdiHeartOutline,
  mdiAccountCircle,
  mdiAccountCircleOutline,
} from "@mdi/js";
import { useHistory } from "react-router-dom";

export default function BottomNav(props) {
  let history = useHistory();
  const ICON_SIZE = 1.4;
  let homeIcon = mdiHomeOutline,
    searchIcon = mdiSearchWeb,
    plusBoxIcon = mdiPlusBoxOutline,
    heartIcon = mdiHeartOutline,
    accountCircleIcon = mdiAccountCircleOutline;

  if (props.active === "home") {
    homeIcon = mdiHome;
  } else if (props.active === "upload") {
    plusBoxIcon = mdiPlusBox;
  } else if (props.active === "activity") {
    heartIcon = mdiHeart;
  } else if (props.active === "myAccount") {
    accountCircleIcon = mdiAccountCircle;
  }
  return (
    <Nav bottomNav={true}>
      <button
        onClick={() => {
          history.push("/home");
        }}
      >
        <Icon path={homeIcon} size={ICON_SIZE} verticle="true" />
      </button>
      <button
        onClick={() => {
          history.push("/explore");
        }}
      >
        <Icon path={searchIcon} size={ICON_SIZE} verticle="true" />
      </button>
      <button>
        <Icon path={plusBoxIcon} size={ICON_SIZE} verticle="true" />
      </button>
      <button
        onClick={() => {
          history.push("/activity");
        }}
      >
        <Icon path={heartIcon} size={ICON_SIZE} verticle="true" />
      </button>
      <button
        onClick={() => {
          history.push("/myaccount");
        }}
      >
        <Icon path={accountCircleIcon} size={ICON_SIZE} verticle="true" />
      </button>
    </Nav>
  );
}
