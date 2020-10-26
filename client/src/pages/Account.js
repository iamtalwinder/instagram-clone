import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Icon from "@mdi/react";
import { mdiCogOutline, mdiAccountPlusOutline, mdiChevronLeft } from "@mdi/js";
import { useLocation } from "react-router-dom";
import Nav from "../components/Nav";
import DashboardContainer from "../components/DashboardContainer";
import BottomNav from "../components/BottomNav";
import { UserContext } from "../context/user";
import Spinner from "../components/Spinner";

export default function Account() {
  const ICON_SIZE = 1.4;

  const location = useLocation();
  const user = useContext(UserContext)[0];

  const [userProfile, setUserProfile] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get("/api/user-profile", {
          params: { userToFind: location.state.userId },
        });
        setUserProfile(data.userProfile);
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
  }, [location.state.userId]);

  return (
    <>
      <Nav topNav={true} itemsCenter={true}>
        {user.userId === location.state.userId ? (
          <button>
            <Icon path={mdiCogOutline} size={ICON_SIZE} verticle="true" />
          </button>
        ) : (
          <button>
            <Icon path={mdiChevronLeft} size={ICON_SIZE} verticle="true" />
          </button>
        )}

        <h5 style={{ fontSize: "15px" }}>
          {loading ? <Spinner /> : userProfile.username}
        </h5>

        {user.userId === location.state.userId ? (
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
      <DashboardContainer></DashboardContainer>
      <BottomNav active="account" />
    </>
  );
}
