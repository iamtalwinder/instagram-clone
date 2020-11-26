import React, { useEffect, useRef, useCallback } from "react";
import styles from "./Modal.module.css";

export default function Modal({ openModal, setOpenModal, children, style }) {
  const modal = useRef(null);

  const close = useCallback(() => {
    setOpenModal(false);
  }, [setOpenModal]);

  useEffect(() => {
    if (openModal) {
      modal.current.classList.add(styles.visible);
    } else {
      modal.current.classList.remove(styles.visible);
    }
  }, [openModal]);

  useEffect(() => {
    const closeButton = document.getElementById("close-modal");
    if (closeButton) {
      closeButton.addEventListener("click", close);
    }
  }, [close]);

  return (
    <div
      className={styles.container}
      ref={modal}
      onClick={(e) => {
        if (e.target === modal.current) close();
      }}
    >
      <div className={styles.modalContent} style={style}>
        {children}
      </div>
    </div>
  );
}
