import { createContext, useCallback, useReducer, useMemo, useContext, useEffect } from 'react';

const usersContext = createContext<any>({});
const initial = {
  name: '',
  avatar: 0,
  words: [{ word: 'walk', pos: 'verb' }],
  currentWordIndex: 0,
  score: 0,
};
function reducer(state: any, action: any) {
  switch (action.type) {
    case 'syncWithLocal':
      const name = localStorage.getItem('name');
      const avatar = localStorage.getItem('avatar');
      const currentWord = localStorage.getItem('currentWordIndex');
      console.log('HAHAH GOTCHA', name, avatar);
      if (name && avatar) {
        return {
          name: name,
          avatar: avatar,
          currentWordIndex: currentWord ? currentWord : 1,
        };
      }
      break;
    case 'name':
      return { ...state, name: action.val };
    case 'avatar':
      return { ...state, avatar: action.val };
    case 'words':
      return { ...state, words: action.val };
    case 'currentWord':
      return { ...state, currentWordIndex: action.val };
  }
}
export function UserProvider({ children }: any) {
  const [info, dispatch] = useReducer(reducer, initial);
  useEffect(() => {
    dispatch({ type: 'syncWithLocal' });
  }, []);
  const setName = useCallback(
    (name: string) => {
      localStorage.setItem('name', name);
      dispatch({ type: 'name', val: name });
    },
    [dispatch],
  );
  const setAvatar = useCallback(
    (avatar: string) => {
      localStorage.setItem('avatar', avatar);
      dispatch({ type: 'avatar', val: avatar });
    },
    [dispatch],
  );
  const getWords = useCallback(
    async (name: string) => {
      let localWords;
      const localWordsStr = localStorage.getItem('words');
      if (localWordsStr) localWords = JSON.parse(localWordsStr);
      if (localWords && Array.isArray(localWords)) {
        return localWords;
      } else {
        const rawWords = await fetch('http://localhost:4000/words');
        const wordsJson = await rawWords.json();
        localStorage.setItem('words', JSON.stringify(wordsJson));
        return wordsJson;
      }
    },
    [dispatch],
  );
  const setCurrentWord = useCallback(() => {}, [dispatch]);
  const value = useMemo(() => {
    return {
      ...info,
      setName,
      setAvatar,
      getWords,
      setCurrentWord,
    };
  }, [info]);
  return <usersContext.Provider value={value} children={children} />;
}
export const useUserContext = () => {
  const context = useContext(usersContext);
  return context;
};
