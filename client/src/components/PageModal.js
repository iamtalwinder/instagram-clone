import React from "react";
import styles from "./PageModal.module.css";
import Nav from "./Nav";
import Icon from "@mdi/react";
import { mdiClose } from "@mdi/js";
import Spinner from "./Spinner";
import EmptyButton from "./EmptyButton";

export default function PageModal(props) {
  const closeModel = () => {
    props.setOpenModal(false);
  };

  return (
    <div className={styles.container}>
      <Nav topNav={true}>
        <EmptyButton onClick={closeModel}>
          <Icon path={mdiClose} size={1.4} verticle="true" />
        </EmptyButton>
        {props.loading ? (
          <Spinner />
        ) : (
          <h5 style={{ fontSize: "15px" }}>{props.title}</h5>
        )}
        <div></div>
      </Nav>
      {props.children}
    </div>
  );
}
