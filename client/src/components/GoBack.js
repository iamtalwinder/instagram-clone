import React from "react";
import Icon from "@mdi/react";
import { mdiChevronLeft } from "@mdi/js";
import { useHistory } from "react-router-dom";

export default function GoBack(props) {
  const history = useHistory();

  const goBack = () => {
    history.goBack();
  };

  return (
    <button onClick={goBack} disabled={props.disabled}>
      <Icon
        path={mdiChevronLeft}
        size={props.ICON_SIZE || 1.4}
        verticle="true"
      />
    </button>
  );
}
