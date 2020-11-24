import React from "react";

export default function FacebookRedirect({ children, disabled }) {
  const params = {
    client_id: process.env.FACEBOOK_APP_ID || 1050934815332379,
    redirect_uri: process.env.FACEBOOK_REDIRECT_URI || "http://localhost:3000",
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
    <a style={style} href={url}>
      {children}
    </a>
  );
}
