import React, { useState, useContext } from "react";
import axios from "axios";
import styles from "./EditProfile.module.css";
import Nav from "../components/Nav";
import BottomNav from "../components/BottomNav";
import GoBack from "../components/GoBack";
import DpThumb from "../components/DpThumb";
import { LoggedInUserContext } from "../context/LoggedInUser";
import Button from "../components/Button";
import TextButton from "../components/TextButton";
import Spinner from "../components/Spinner";
import toast from "../components/toast";
import DpModal from "../components/DpModal";

export default function () {
  const [loggedInUser, setLoggedInUser] = useContext(LoggedInUserContext);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const upload = async (event) => {
    setOpenModal(false);
    setLoading(true);
    const file = event.target.files[0];
    const data = new FormData();
    data.append("img", file);

    try {
      const response = await axios.patch("/api/change-dp", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(response);
      setLoggedInUser((prevstate) => {
        return {
          ...prevstate,
          dpPath: response.data.dpPath,
        };
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
      setLoggedInUser((prevstate) => {
        return {
          ...prevstate,
          dpPath: null,
        };
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

  const changeProfilePhoto = () => {
    if (loggedInUser.dpPath) {
      setOpenModal(true);
    } else {
      clickFileInput();
    }
  };

  const clickFileInput = () => {
    document.getElementById("inputFile").click();
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
              id="inputFile"
              type="file"
              name="file"
              accept="image/png, image/jpg, image/jpeg"
              onChange={upload}
              style={{ display: "none" }}
            />
            <TextButton
              type="button"
              onClick={changeProfilePhoto}
              disabled={loading}
            >
              Change Profile Photo
            </TextButton>
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
      {openModal && (
        <DpModal
          setOpenModal={setOpenModal}
          clickFileInput={clickFileInput}
          removeDP={removeDP}
        />
      )}
      <BottomNav active="account" />
    </>
  );
}
