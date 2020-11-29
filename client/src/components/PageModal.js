import React, { useRef, useEffect } from "react";
import styles from "./PageModal.module.css";
import Nav from "./Nav";
import Icon from "@mdi/react";
import { mdiClose } from "@mdi/js";
import Spinner from "./Spinner";
import EmptyButton from "./EmptyButton";

export default function PageModal({
  openModal,
  setOpenModal,
  loading,
  title,
  children,
  animation,
}) {
  const modal = useRef(null);

  const close = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    if (openModal) {
      modal.current.classList.add(styles.visible);
    } else {
      modal.current.classList.remove(styles.visible);
    }
  }, [openModal]);

  return (
    <div className={styles.container} ref={modal} data-animation={animation}>
      <Nav topNav={true}>
        <EmptyButton onClick={close}>
          <Icon path={mdiClose} size={1.4} verticle="true" />
        </EmptyButton>
        {loading ? <Spinner /> : <h5 style={{ fontSize: "15px" }}>{title}</h5>}
        <div></div>
      </Nav>
      {children}
    </div>
  );
}
