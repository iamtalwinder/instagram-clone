import React, { useReducer, createContext } from "react";

export const Context = createContext({});

export const actionTypes = {
  ADD_NEW_POSTS: "ADD_NEW_POSTS",
  LIKE: "LIKE",
  UNLIKE: "UNLIKE",
  INCREMENT_COMMENTS: "INCREMENT_COMMENTS",
  DELETE_POST: "DELETE_POST",
};

export const ContextProvider = (props) => {
  const reducer = (state, { type, newPosts, postIndex }) => {
    switch (type) {
      case actionTypes.ADD_NEW_POSTS:
        return [...state, ...newPosts];

      case actionTypes.LIKE:
        if (!state[postIndex].isLiked) {
          state[postIndex].likes++;
          state[postIndex].isLiked = true;
        }
        return [...state];

      case actionTypes.UNLIKE:
        if (state[postIndex].isLiked) {
          state[postIndex].likes--;
          state[postIndex].isLiked = false;
        }
        return [...state];

      case actionTypes.INCREMENT_COMMENTS:
        state[postIndex].comments++;
        return state;

      case actionTypes.DELETE_POST:
        state.splice(postIndex, 1);
        return state;

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, []);

  return (
    <Context.Provider value={[state, dispatch]}>
      {props.children}
    </Context.Provider>
  );
};
