import React from "react";

export default function FacebookRedirect({ children, disabled, onClick }) {
  const params = {
    client_id: process.env.REACT_APP_FACEBOOK_APP_ID,
    redirect_uri: process.env.REACT_APP_FACEBOOK_REDIRECT_URI,
    scope: ["email"].join(","),
    response_type: "code",
    auth_type: "rerequest",
    display: "popup",
  };

  const url = `https://www.facebook.com/v4.0/dialog/oauth?${new URLSearchParams(
    params
  )}`;

  const style = {
    width: "100%",
    textDecoration: "none",
    pointerEvents: "auto",
  };

  if (disabled) {
    style.pointerEvents = "none";
  }

  return (
    <a style={style} href={url} onClick={onClick}>
      {children}
    </a>
  );
}
