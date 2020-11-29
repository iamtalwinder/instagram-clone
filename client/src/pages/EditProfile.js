import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import styles from "./EditProfile.module.css";
import Nav from "../components/Nav";
import BottomNav from "../components/BottomNav";
import GoBack from "../components/GoBack";
import DpThumb from "../components/DpThumb";
import {
  Context as LoggedInUserContext,
  actionTypes as LoggedInUserActionTypes,
} from "../context/LoggedInUser";
import Button from "../components/Button";
import TextButton from "../components/TextButton";
import Spinner from "../components/Spinner";
import DpModal from "../components/DpModal";
import { useToast } from "../hooks";

export default function EditProfile() {
  const [loggedInUser, loggedInUserDispatch] = useContext(LoggedInUserContext);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const toast = useToast();

  const [fullname, setFullname] = useState(loggedInUser.fullname);
  const [username, setUsername] = useState(loggedInUser.username);
  const [website, setWebsite] = useState(loggedInUser.website || "");
  const [bio, setBio] = useState(loggedInUser.bio || "");
  const [email, setEmail] = useState(loggedInUser.email);
  const [phoneNumber, setPhoneNumber] = useState(
    loggedInUser.phoneNumber || ""
  );

  useEffect(() => {
    if (
      fullname === loggedInUser.fullname &&
      username === loggedInUser.username &&
      website === (loggedInUser.website || "") &&
      bio === (loggedInUser.bio || "") &&
      email === loggedInUser.email &&
      phoneNumber === (loggedInUser.phoneNumber || "")
    ) {
      setIsSubmitDisabled(true);
    } else {
      setIsSubmitDisabled(false);
    }
  }, [
    fullname,
    username,
    website,
    bio,
    email,
    phoneNumber,
    loggedInUser.fullname,
    loggedInUser.username,
    loggedInUser.website,
    loggedInUser.bio,
    loggedInUser.email,
    loggedInUser.phoneNumber,
  ]);

  const uploadDP = async (event) => {
    setOpenModal(false);
    setLoading(true);
    const file = event.target.files[0];
    const data = new FormData();
    data.append("img", file);

    try {
      const response = await axios.patch("/api/change-dp", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      loggedInUserDispatch({
        type: LoggedInUserActionTypes.CHANGE_DP,
        dpPath: response.data.dpPath,
      });

      toast.open({
        type: "info",
        message: response.data.msg,
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

  const removeDP = async () => {
    setOpenModal(false);
    setLoading(true);
    try {
      const response = await axios.patch("/api/remove-dp");

      loggedInUserDispatch({
        type: LoggedInUserActionTypes.REMOVE_DP,
        dpPath: null,
      });

      toast.open({
        type: "info",
        message: response.data.msg,
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

  const editProfile = async () => {
    setLoading(true);
    try {
      const response = await axios.patch("/api/edit-profile", {
        fullname: fullname,
        username: username,
        website: website === "" ? null : website,
        bio: bio === "" ? null : bio,
        email: email,
        phoneNumber: phoneNumber === "" ? null : phoneNumber,
      });

      loggedInUserDispatch({
        type: LoggedInUserActionTypes.SET_USER,
        user: response.data.user,
      });

      toast.open({
        type: "info",
        message: response.data.msg,
      });
    } catch (err) {
      if (err.response) {
        toast.open({
          type: "error",
          message: err.response.data.msg,
        });
      } else {
        toast.open({
          type: "error",
          message: "Something went wrong. Try again!",
        });
      }
    }
    setLoading(false);
  };

  const changeDP = () => {
    if (loggedInUser.dpPath) {
      setOpenModal(true);
    } else {
      clickFileInput();
    }
  };

  const clickFileInput = () => {
    document.getElementById("dpInput").click();
  };

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
            {loading ? <Spinner /> : <DpThumb dpPath={loggedInUser.dpPath} />}
          </label>
          <div>
            <p>{loggedInUser.username}</p>
            <input
              id="dpInput"
              type="file"
              name="file"
              accept="image/png, image/jpg, image/jpeg"
              onChange={uploadDP}
              style={{ display: "none" }}
            />
            <TextButton type="button" onClick={changeDP} disabled={loading}>
              Change Profile Photo
            </TextButton>
          </div>
        </div>
        <div className={styles.row}>
          <label className={styles.label}>Name</label>
          <div>
            <input
              className={styles.input}
              type="text"
              placeholder="Name"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
            />
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
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.row}>
          <label className={styles.label}>Website</label>
          <div>
            <input
              className={styles.input}
              type="text"
              placeholder="Website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.row}>
          <label className={styles.label}>Bio</label>
          <div>
            <textarea
              className={styles.input}
              rows="2"
              cols="50"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
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
            <input
              className={styles.input}
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.row}>
          <label className={styles.label}>Phone Number</label>
          <div>
            <input
              className={styles.input}
              type="tel"
              placeholder="Phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.row}>
          <label className={styles.label}></label>
          <div className={styles.buttons}>
            <Button
              type="submit"
              style={{ width: "fit-content" }}
              onClick={editProfile}
              disabled={isSubmitDisabled || loading}
            >
              Submit
            </Button>
            <TextButton type="button" disabled={true}>
              Temporarily disable my account
            </TextButton>
          </div>
        </div>
      </form>

      <DpModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        clickFileInput={clickFileInput}
        removeDP={removeDP}
      />

      <BottomNav active="account" />
    </>
  );
}
