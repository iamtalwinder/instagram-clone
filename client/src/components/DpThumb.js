import React from "react";
import dp from "../img/dp_thumb.jpeg";

export default function DpPreview(props) {
  let dpPath = props.dpPath;

  if (dpPath) {
    dpPath += "_thumb.jpeg";
  }

  const style = {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    ...props.style,
  };
  return <img style={style} src={dpPath || dp} alt="" />;
}
