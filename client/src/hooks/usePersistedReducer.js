import { useReducer, useEffect } from "react";

export default function usePersistedState(key, reducer, initialState, init) {
  const getSavedValue = (key, initialState, init) => {
    const savedValue = JSON.parse(localStorage.getItem(key));

    if (savedValue) {
      return savedValue;
    }

    if (init) {
      return init(initialState);
    }

    return initialState;
  };

  const [state, dispatch] = useReducer(reducer, initialState, () => {
    return getSavedValue(key, initialState, init);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, dispatch];
}
