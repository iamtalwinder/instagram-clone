import React from "react";
import Icon from "@mdi/react";
import { mdiChevronLeft } from "@mdi/js";
import { useHistory } from "react-router-dom";
import EmptyButton from "./EmptyButton";

export default function GoBack(props) {
  const history = useHistory();

  const goBack = () => {
    history.goBack();
  };

  return (
    <EmptyButton onClick={goBack} disabled={props.disabled}>
      <Icon
        path={mdiChevronLeft}
        size={props.ICON_SIZE || 1.4}
        verticle="true"
      />
    </EmptyButton>
  );
}
