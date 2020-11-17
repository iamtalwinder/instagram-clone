import React, { useEffect, useRef } from "react";
import Button from "./Button";
import styles from "./Modal.module.css";

export default function Modal({ openModal, setOpenModal, children, style }) {
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

  const buttonStyles = {
    background: "none",
    borderRadius: "none",
    borderTop: "1px solid #ccc",
    padding: "10px",
    color: "black",
  };

  const buttons = React.Children.map(children, (child) => {
    if (child.type.name === "Button") {
      return React.cloneElement(child, {
        style: { ...buttonStyles, ...child.props.style },
      });
    }
    return child;
  });

  return (
    <div
      className={styles.container}
      ref={modal}
      onClick={(e) => {
        if (e.target === modal.current) close();
      }}
    >
      <div className={styles.modalContent} style={style}>
        {buttons}
        <Button style={buttonStyles} onClick={close}>
          Cancle
        </Button>
      </div>
    </div>
  );
}
