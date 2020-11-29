import React, { createContext } from "react";
import { usePersistedReducer } from "../hooks";

export const Context = createContext({});

export const actionTypes = {
  SET_USER: "SET_USER",
  CHANGE_DP: "CHANGE_DP",
  REMOVE_DP: "REMOVE_DP",
};

export const ContextProvider = (props) => {
  const reducer = (state, action) => {
    switch (action.type) {
      case actionTypes.SET_USER:
        return action.user;

      case actionTypes.CHANGE_DP:
        return { ...state, dpPath: action.dpPath };

      case actionTypes.REMOVE_DP:
        return { ...state, dpPath: null };

      default:
        return state;
    }
  };
  const [state, dispatch] = usePersistedReducer("loggedInUser", reducer, {});

  return (
    <Context.Provider value={[state, dispatch]}>
      {props.children}
    </Context.Provider>
  );
};
