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
import SettingsModal from "../components/SettingsModal";
import { useToast } from "../hooks";

export default function Account() {
  const ICON_SIZE = 1.4;

  const loggedInUser = useContext(LoggedInUserContext)[0];
  const [visitedUser, visitedUserDispatch] = useContext(VisitedUserContext);

  const location = useLocation();
  const history = useHistory();

  const [loading, setLoading] = useState(true);
  const [openSettingsModal, setOpenSettingsModal] = useState(false);
  const toast = useToast();

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
        console.log(err);

        toast.open({
          type: "error",
          message: "Something went wrong. Try again!",
        });
      }
      setLoading(false);
    };
    fetchUserProfile();
  }, [location.state.userId, visitedUserDispatch, toast]);

  return (
    <>
      <Nav topNav={true}>
        {MY_ACCOUNT ? (
          <EmptyButton
            onClick={() => {
              setOpenSettingsModal(true);
            }}
          >
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
          <div className={styles.row1}>
            <div className={styles.dp}>
              {loading ? (
                <Spinner />
              ) : (
                <>
                  <DpPreview dpPath={visitedUser.dpPath} />
                </>
              )}
            </div>
            <div className={styles.action}>
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
                  userId={visitedUser.userId}
                  username={visitedUser.username}
                  dpPath={visitedUser.dpPath}
                  isFollowing={visitedUser.isFollowing}
                  dispatch={visitedUserDispatch}
                  actionTypes={VisitedUserActionTypes}
                />
              )}
            </div>
          </div>

          {!loading && (
            <div className={styles.row2}>
              <p className={styles.fullname}> {visitedUser.fullname} </p>
              <p className={styles.bio}>{visitedUser.bio}</p>
              <a
                className={styles.website}
                href={visitedUser.website}
                target="_blanck"
              >
                {visitedUser.website}
              </a>
            </div>
          )}
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
            <Posts visitedUserId={visitedUser.userId} postsPerPage={25} />
          </PostsContextProvider>
        )}
      </DashboardContainer>

      <SettingsModal
        openModal={openSettingsModal}
        setOpenModal={setOpenSettingsModal}
      />
      <BottomNav active="account" />
    </>
  );
}
