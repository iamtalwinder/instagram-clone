import React, { useContext } from "react";
import styles from "./EditProfile.module.css";
import Nav from "../components/Nav";
import BottomNav from "../components/BottomNav";
import GoBack from "../components/GoBack";
import DpThumb from "../components/DpThumb";
import { LoggedInUserContext } from "../context/LoggedInUser";
import Button from "../components/Button";
import TextButton from "../components/TextButton";

export default function () {
  const loggedInUser = useContext(LoggedInUserContext)[0];
  return (
    <>
      <Nav topNav={true}>
        <GoBack />
        <h5 style={{ fontSize: "15px" }}>Edit Profile</h5>
        <div></div>
      </Nav>
      <form className={styles.form}>
        <div className={styles.row}>
          <label className={styles.label}>
            <DpThumb />
          </label>
          <div>
            <p>{loggedInUser.username}</p>
            <TextButton type="button">Change Profile Photo</TextButton>
          </div>
        </div>
        <div className={styles.row}>
          <label className={styles.label}>Name</label>
          <div>
            <input className={styles.input} type="text" placeholder="Name" />
          </div>
        </div>

        <div className={styles.row}>
          <label className={styles.label}></label>
          <div>
            <p className={styles.extraInfoDetails}>
              Help people discover your account by using the name you're known
              by: either your full name, nickname, or business name.
            </p>
          </div>
        </div>

        <div className={styles.row}>
          <label className={styles.label}>Username</label>
          <div>
            <input
              className={styles.input}
              type="text"
              placeholder="Username"
            />
          </div>
        </div>

        <div className={styles.row}>
          <label className={styles.label}>Website</label>
          <div>
            <input className={styles.input} type="text" placeholder="Website" />
          </div>
        </div>

        <div className={styles.row}>
          <label className={styles.label}>Bio</label>
          <div>
            <textarea className={styles.input} rows="2" cols="50" />
          </div>
        </div>

        <div className={styles.row}>
          <label className={styles.label}></label>
          <div>
            <h3 className={styles.extraInfoHeading}>Personal Information</h3>
            <p className={styles.extraInfoDetails}>
              Provide your personal information, even if the account is used for
              a business, a pet or something else. This won't be a part of your
              public profile.
            </p>
          </div>
        </div>

        <div className={styles.row}>
          <label className={styles.label}>Email</label>
          <div>
            <input className={styles.input} type="email" placeholder="Email" />
          </div>
        </div>

        <div className={styles.row}>
          <label className={styles.label}>Phone Number</label>
          <div>
            <input
              className={styles.input}
              type="tel"
              placeholder="Phone number"
            />
          </div>
        </div>

        <div className={styles.row}>
          <label className={styles.label}></label>
          <div className={styles.buttons}>
            <Button
              type="submit"
              style={{ width: "fit-content" }}
              disabled={true}
            >
              Submit
            </Button>
            <TextButton type="button" disabled={true}>
              Temporarily disable my account
            </TextButton>
          </div>
        </div>
      </form>
      <BottomNav active="account" />
    </>
  );
}
