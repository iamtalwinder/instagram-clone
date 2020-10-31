import React, { useState, useEffect, createContext } from "react";

export const LoggedInUserContext = createContext({});

export const LoggedInUserContextProvider = (props) => {
  const [loggedInUser, setLoggedInUser] = useState({});

  useEffect(() => {
    try {
      const data = JSON.parse(localStorage.getItem("loggedInUser"));
      if (data) {
        setLoggedInUser(data);
      } else {
        setLoggedInUser({});
      }
    } catch (err) {
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
