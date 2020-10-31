import React, { createContext } from "react";
import { usePersistedState } from "../hooks";

export const LoggedInUserContext = createContext({});

export const LoggedInUserContextProvider = (props) => {
  const [loggedInUser, setLoggedInUser] = usePersistedState("loggedInUser", {});

  return (
    <LoggedInUserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      {props.children}
    </LoggedInUserContext.Provider>
  );
};
