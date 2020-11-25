import React, { useState } from "react";
import styles from "./SettingsModal.module.css";
import DashboardContainer from "./DashboardContainer";
import PageModal from "./PageModal";
import { useHistory } from "react-router-dom";
import Option from "./Option";
import LogoutModal from "./LogoutModal";

export default function SettingsModal({ openModal, setOpenModal }) {
  const history = useHistory();

  const [openLogoutModal, setOpenLogoutModal] = useState(false);
  return (
    <>
      <PageModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        title="Options"
        animation="right-in"
      >
        <DashboardContainer
          style={{
            background: "#fafafa",
            margin: "auto",
            paddingBottom: "50px",
          }}
        >
          <h3 className={styles.heading}>ACCOUNT</h3>
          <Option
            text="Edit profile"
            onClick={() => {
              history.push("edit-profile");
            }}
          />
          <Option text="Nametag" disabled={true} />
          <Option text="Change Password" disabled={true} />
          <Option text="Privacy and Security" disabled={true} />
          <Option text="Login Activity" disabled={true} />
          <Option text="Emails from Instagram" disabled={true} />

          <h3 className={styles.heading}>SETTINGS</h3>
          <Option text="Languages" disabled={true} includeIcon={false} />
          <Option text="Apps and Websites" disabled={true} />
          <Option text="Notifications" disabled={true} />

          <h3 className={styles.heading}>ABOUT</h3>
          <Option text="Ads" disabled={true} />
          <Option text="Help Center" disabled={true} />
          <Option text="Report a Problem" disabled={true} />
          <Option text="More" disabled={true} />

          <Option
            text="Log Out"
            style={{
              color: "red",
              marginTop: "20px",
              borderTop: "1px solid #cfccca",
            }}
            onClick={() => setOpenLogoutModal(true)}
          />
        </DashboardContainer>

        <LogoutModal
          openModal={openLogoutModal}
          setOpenModal={setOpenLogoutModal}
        />
      </PageModal>
    </>
  );
}
