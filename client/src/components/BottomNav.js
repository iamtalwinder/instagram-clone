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
import { UserContext } from "../context/user";
import dpThumb from "../img/dp_thumb.jpeg";

export default function BottomNav(props) {
  const history = useHistory();

  const ICON_SIZE = 1.4;

  let homeIcon = mdiHomeOutline,
    searchIcon = mdiSearchWeb,
    plusBoxIcon = mdiPlusBoxOutline,
    heartIcon = mdiHeartOutline;

  const user = useContext(UserContext)[0];
  let dpPath = user.dpPath;

  if (dpPath) {
    dpPath += "_thumb.jpeg";
  }

  if (props.active === "home") {
    homeIcon = mdiHome;
  } else if (props.active === "upload") {
    plusBoxIcon = mdiPlusBox;
  } else if (props.active === "activity") {
    heartIcon = mdiHeart;
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
            state: { userId: user.userId },
          });
        }}
      >
        <img
          style={{
            borderRadius: "50%",
            width: `${ICON_SIZE * 25}px`,
            height: `${ICON_SIZE * 25}px`,
          }}
          src={dpPath || dpThumb}
          alt=""
        />
      </button>
    </Nav>
  );
}
