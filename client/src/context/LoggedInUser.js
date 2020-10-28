import React, { useState, useEffect, createContext } from "react";

export const LoggedInUserContext = createContext({});

export const LoggedInUserContextProvider = (props) => {
  const [loggedInUser, setLoggedInUser] = useState({});

  useEffect(() => {
    const data = localStorage.getItem("loggedInUser");
    if (data) {
      setLoggedInUser(JSON.parse(data));
    } else {
      setLoggedInUser({});
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
  });

  return (
    <LoggedInUserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      {props.children}
    </LoggedInUserContext.Provider>
  );
};
