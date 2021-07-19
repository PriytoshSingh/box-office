import { useReducer, useEffect } from 'react';

function showsReducer(prevState, aciton) {
  switch (aciton.type) {
    case 'ADD': {
      return [...prevState, aciton.showId];
    }

    case 'REMOVE': {
      return prevState.filter(showId => showId !== aciton.showId);
    }

    default:
      return prevState;
  }
}

function usePersistedReducer(reducer, initialState, key) {
  const [state, dispatch] = useReducer(reducer, initialState, initial => {
    const persisted = localStorage.getItem(key);

    return persisted ? JSON.parse(persisted) : initial;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [state, key]);

  return [state, dispatch];
}

export function useShow(key = 'show') {
  return usePersistedReducer(showsReducer, [], key);
}
