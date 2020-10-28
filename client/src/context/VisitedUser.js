import React, { useState, createContext } from "react";

export const VisitedUserContext = createContext({});

export const VisitedUserContextProvider = (props) => {
  const [visitedUser, setVisitedUser] = useState({});

  return (
    <VisitedUserContext.Provider value={[visitedUser, setVisitedUser]}>
      {props.children}
    </VisitedUserContext.Provider>
  );
};
