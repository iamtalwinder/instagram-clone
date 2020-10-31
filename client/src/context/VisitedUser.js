import React, { useReducer, createContext } from "react";

export const Context = createContext({});

export const actionTypes = {
  SET_USER: "SET_USER",
  FOLLOW: "FOLLOW",
  UNFOLLOW: "UNFOLLOW",
};

export const ContextProvider = (props) => {
  const reducer = (state, action) => {
    switch (action.type) {
      case actionTypes.SET_USER:
        return action.user;

      case actionTypes.FOLLOW:
        return { ...state, followers: state.followers + 1, isFollowing: true };

      case actionTypes.UNFOLLOW:
        return { ...state, followers: state.followers - 1, isFollowing: false };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, {});

  return (
    <Context.Provider value={[state, dispatch]}>
      {props.children}
    </Context.Provider>
  );
};
