import React from "react";
import Icon from "@mdi/react";
import { mdiLoading } from "@mdi/js";

export default function Button(props) {
  return (
    <Icon
      path={mdiLoading}
      size={props.size || 0.6}
      horizontal
      color={props.color || "black"}
      spin
    />
  );
}
