import { createContext, useCallback, useReducer, useMemo, useContext, useEffect } from 'react';

const usersContext = createContext<any>({});
const initial = {
  name: '',
  avatar: 0,
  currentWordIndex: 0,
  score: 0,
  isRunningGame: 0,
};
function reducer(state: any, action: any) {
  switch (action.type) {
    case 'syncWithLocal':
      const name = localStorage.getItem('name');
      const avatar = localStorage.getItem('avatar');
      const isRunningGame = localStorage.getItem('isRunningGame');
      if (isRunningGame && name && avatar) {
        return {
          name: name,
          avatar: avatar,
        };
      }
      break;
    case 'name':
      return { ...state, name: action.val };
    case 'avatar':
      return { ...state, avatar: action.val };
    case 'isRunningGame':
      return { ...state, isRunningGame: action.val };
  }
}
export function UserProvider({ children }: any) {
  const [info, dispatch] = useReducer(reducer, initial);
  useEffect(() => {
    dispatch({ type: 'syncWithLocal' });
  }, []);

  const setIsRunningGame = useCallback((val: string) => {
    localStorage.setItem('isRunningGame', '1');
    dispatch({ type: 'isRunningGame', val: val });
  }, []);
  const value = useMemo(() => {
    return {
      ...info,
      setIsRunningGame,
    };
  }, [info]);
  return <usersContext.Provider value={value} children={children} />;
}
export const useUserContext = () => {
  const context = useContext(usersContext);
  return context;
};
