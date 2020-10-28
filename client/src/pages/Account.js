import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Icon from "@mdi/react";
import { mdiCogOutline, mdiAccountPlusOutline, mdiChevronLeft } from "@mdi/js";
import { useLocation } from "react-router-dom";
import millify from "millify";
import styles from "./Account.module.css";
import Nav from "../components/Nav";
import DashboardContainer from "../components/DashboardContainer";
import BottomNav from "../components/BottomNav";
import { LoggedInUserContext } from "../context/LoggedInUser";
import { VisitedUserContext } from "../context/VisitedUser";
import Spinner from "../components/Spinner";
import Follow from "../components/Follow";
import DpPreview from "../components/DpPreview";

export default function Account() {
  const ICON_SIZE = 1.4;

  const location = useLocation();
  const loggedInUser = useContext(LoggedInUserContext)[0];
  const [visitedUser, setVisitedUser] = useContext(VisitedUserContext);
  const [loading, setLoading] = useState(true);

  const MY_ACCOUNT = loggedInUser.userId === location.state.userId;

  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get("/api/user-profile", {
          params: { userToFind: location.state.userId },
        });
        setVisitedUser(data.userProfile);
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
  }, [location.state.userId, setVisitedUser]);

  return (
    <>
      <Nav topNav={true} itemsCenter={true}>
        {MY_ACCOUNT ? (
          <button>
            <Icon path={mdiCogOutline} size={ICON_SIZE} verticle="true" />
          </button>
        ) : (
          <button>
            <Icon path={mdiChevronLeft} size={ICON_SIZE} verticle="true" />
          </button>
        )}

        <h5 style={{ fontSize: "15px" }}>
          {loading ? <Spinner /> : visitedUser.username}
        </h5>

        {MY_ACCOUNT ? (
          <button>
            <Icon
              path={mdiAccountPlusOutline}
              size={ICON_SIZE}
              verticle="true"
            />
          </button>
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
              <button className={styles.button}>Edit Profile</button>
            ) : (
              <Follow loading={loading} />
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
        <div>posts</div>
      </DashboardContainer>
      <BottomNav active="account" />
    </>
  );
}
