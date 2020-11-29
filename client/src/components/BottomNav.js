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
import { Context as LoggedInUserContext } from "../context/LoggedInUser";
import DpThumb from "./DpThumb";
import EmptyButton from "../components/EmptyButton";

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

  const clickInput = (e) => {
    document.getElementById("postInput").click();
  };

  const handleInputChange = (e) => {
    history.push({
      pathname: "/new-post",
      state: { img: e.target.files[0] },
    });
  };

  return (
    <Nav bottomNav={true}>
      <input
        id="postInput"
        type="file"
        name="file"
        accept="image/png, image/jpg, image/jpeg"
        onChange={handleInputChange}
        style={{ display: "none" }}
      />
      <EmptyButton
        onClick={() => {
          history.push("/home");
        }}
      >
        <Icon path={homeIcon} size={ICON_SIZE} verticle="true" />
      </EmptyButton>
      <EmptyButton
        onClick={() => {
          history.push("/explore");
        }}
      >
        <Icon path={searchIcon} size={ICON_SIZE} verticle="true" />
      </EmptyButton>
      <EmptyButton onClick={clickInput}>
        <Icon path={plusBoxIcon} size={ICON_SIZE} verticle="true" />
      </EmptyButton>
      <EmptyButton
        onClick={() => {
          history.push("/activity");
        }}
      >
        <Icon path={heartIcon} size={ICON_SIZE} verticle="true" />
      </EmptyButton>
      <EmptyButton
        onClick={() => {
          history.push({
            pathname: "/account",
            state: { userId: loggedInUser.userId, refreshPosts: false },
          });
        }}
      >
        <DpThumb style={dpStyle} dpPath={loggedInUser.dpPath} />
      </EmptyButton>
    </Nav>
  );
}
