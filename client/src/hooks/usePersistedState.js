import { useState, useEffect } from "react";

export default function usePersistedState(key, init) {
  const getSavedValue = (key, init) => {
    const savedValue = JSON.parse(localStorage.getItem(key));

    if (savedValue) {
      return savedValue;
    }

    if (init instanceof Function) {
      return init();
    }

    return init;
  };

  const [state, setState] = useState(() => {
    return getSavedValue(key, init);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}
