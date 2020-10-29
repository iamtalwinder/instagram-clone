import React, { useContext } from "react";
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
} from "@mdi/js";
import { useHistory } from "react-router-dom";
import { LoggedInUserContext } from "../context/LoggedInUser";
import DpThumb from "./DpThumb";

export default function BottomNav({ active }) {
  const history = useHistory();

  const ICON_SIZE = 1.4;

  let homeIcon = mdiHomeOutline,
    searchIcon = mdiSearchWeb,
    plusBoxIcon = mdiPlusBoxOutline,
    heartIcon = mdiHeartOutline;

  const loggedInUser = useContext(LoggedInUserContext)[0];

  let dpStyle = {
    width: `${ICON_SIZE * 25}px`,
    height: `${ICON_SIZE * 25}px`,
  };

  if (active === "home") {
    homeIcon = mdiHome;
  } else if (active === "upload") {
    plusBoxIcon = mdiPlusBox;
  } else if (active === "activity") {
    heartIcon = mdiHeart;
  } else if (active === "account") {
    dpStyle = { ...dpStyle, border: "2px solid black" };
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
          history.push({
            pathname: "/account",
            state: { userId: loggedInUser.userId },
          });
        }}
      >
        <DpThumb style={dpStyle} dpPath={loggedInUser.dpPath} />
      </button>
    </Nav>
  );
}
