import React from "react";
import dp from "../img/dp.jpeg";

export default function DpPreview(props) {
  let dpPath = props.dpPath;

  if (dpPath) {
    dpPath += ".jpeg";
  }

  const style = {
    width: "90px",
    height: "90px",
    borderRadius: "50%",
    ...props.style,
  };
  return <img style={style} src={dpPath || dp} alt="" />;
}
