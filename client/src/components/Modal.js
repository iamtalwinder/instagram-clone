import React from "react";
import Button from "./Button";
import styles from "./Modal.module.css";

export default function Modal(props) {
  const closeModel = (e) => {
    const id = e.target.id;
    if (id === "cancle" || id === "container") {
      props.setOpenModal(false);
    }
  };

  const buttonStyles = {
    background: "none",
    borderRadius: "none",
    borderTop: "1px solid #ccc",
    padding: "10px",
    color: "black",
  };

  const children = React.Children.map(props.children, (child) => {
    if (child.type.name === "Button") {
      return React.cloneElement(child, {
        style: { ...buttonStyles, ...child.props.style },
      });
    }
    return child;
  });

  return (
    <div className={styles.container} id="container" onClick={closeModel}>
      <div className={styles.modelContent} style={props.style}>
        {children}
        <Button style={buttonStyles} id="cancle" onClick={closeModel}>
          Cancle
        </Button>
      </div>
    </div>
  );
}
