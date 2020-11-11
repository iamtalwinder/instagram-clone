import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Icon from "@mdi/react";
import { mdiCogOutline, mdiAccountPlusOutline } from "@mdi/js";
import { useLocation, useHistory } from "react-router-dom";
import millify from "millify";
import styles from "./Account.module.css";
import Nav from "../components/Nav";
import DashboardContainer from "../components/DashboardContainer";
import BottomNav from "../components/BottomNav";
import { Context as LoggedInUserContext } from "../context/LoggedInUser";
import {
  Context as VisitedUserContext,
  actionTypes as VisitedUserActionTypes,
} from "../context/VisitedUser";
import { ContextProvider as PostsContextProvider } from "../context/Posts";
import Spinner from "../components/Spinner";
import Follow from "../components/Follow";
import DpPreview from "../components/DpPreview";
import Button from "../components/Button";
import GoBack from "../components/GoBack";
import Posts from "../components/Posts";
import EmptyButton from "../components/EmptyButton";

export default function Account() {
  const ICON_SIZE = 1.4;

  const loggedInUser = useContext(LoggedInUserContext)[0];
  const [visitedUser, visitedUserDispatch] = useContext(VisitedUserContext);

  const location = useLocation();
  const history = useHistory();

  const [loading, setLoading] = useState(true);

  const MY_ACCOUNT = loggedInUser.userId === location.state.userId;

  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get("/api/user-profile", {
          params: { userToFind: location.state.userId },
        });

        visitedUserDispatch({
          type: VisitedUserActionTypes.SET_USER,
          user: data.userProfile,
        });
      } catch (err) {
        if (err.response) {
          alert(err.response.data.msg);
        } else if (err.request) {
          alert("Something went wrong");
        } else {
          alert("Network error");
        }
      }
      setLoading(false);
    };
    fetchUserProfile();
  }, [location.state.userId, visitedUserDispatch]);

  return (
    <>
      <Nav topNav={true}>
        {MY_ACCOUNT ? (
          <EmptyButton>
            <Icon path={mdiCogOutline} size={ICON_SIZE} verticle="true" />
          </EmptyButton>
        ) : (
          <GoBack ICON_SIZE={ICON_SIZE} />
        )}

        <h5 style={{ fontSize: "15px" }}>
          {loading ? <Spinner /> : visitedUser.username}
        </h5>

        {MY_ACCOUNT ? (
          <EmptyButton>
            <Icon
              path={mdiAccountPlusOutline}
              size={ICON_SIZE}
              verticle="true"
            />
          </EmptyButton>
        ) : (
          <div></div>
        )}
      </Nav>
      <DashboardContainer>
        <div className={styles.top}>
          <div className={styles.dp}>
            {loading ? (
              <Spinner />
            ) : (
              <>
                <DpPreview dpPath={visitedUser.dpPath} />
                <p> {visitedUser.fullname} </p>
              </>
            )}
          </div>
          <div className={styles.profile}>
            <p>{loading ? <Spinner /> : visitedUser.username}</p>
            {MY_ACCOUNT ? (
              <Button
                style={{
                  background: "white",
                  border: "1px solid #ccc",
                  color: "black",
                }}
                onClick={() => {
                  history.push("edit-profile");
                }}
              >
                Edit Profile
              </Button>
            ) : (
              <Follow
                user={visitedUser}
                dispatch={visitedUserDispatch}
                actionTypes={VisitedUserActionTypes}
              />
            )}
          </div>
        </div>
        <div className={styles.numbers}>
          <div>
            <p>{loading ? <Spinner /> : millify(visitedUser.posts)}</p>
            <label>posts</label>
          </div>
          <div>
            <p>{loading ? <Spinner /> : millify(visitedUser.followers)}</p>
            <label>followers</label>
          </div>
          <div>
            <p>{loading ? <Spinner /> : millify(visitedUser.following)}</p>
            <label>following</label>
          </div>
        </div>
        {loading ? (
          <Spinner />
        ) : (
          <PostsContextProvider>
            <Posts
              userId={visitedUser.userId}
              refreshPosts={location.state.refreshPosts}
            />
          </PostsContextProvider>
        )}
      </DashboardContainer>

      <BottomNav active="account" />
    </>
  );
}
