import { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from 'react';
import { useUserContext } from './users';
type initialT = {
  words: Array<{ word: string; pos: string }>;
  [key: string]: any;
};
const initial: initialT = {
  words: [],
  progress: 0,
  currentWord: 0,
  name: '',
  avatar: 0,
  score: 0,
  correctAns: 0,
  getWords: () => {},
  getNextWord: () => {},
};
function fetchFromStorage(dataPoints: string[]) {
  let data: { [key: string]: string | null } = {};
  for (const dataPoint of dataPoints) {
    const result = localStorage.getItem(dataPoint);
    data[dataPoint] = result;
  }
  return data;
}
const gameContext = createContext(initial);
function gameReducer(state: any, action: any) {
  switch (action.type) {
    case 'syncWithStorage':
      return { ...state, ...action.val };
    case 'name':
      return { ...state, name: action.val };
    case 'avatar':
      return { ...state, avatar: action.val };
    case 'words':
      return { ...state, words: action.val };
    case 'currentWord':
      return { ...state, currentWord: action.val };
    case 'progress':
      return { ...state, progress: action.val };
    case 'correctAns':
      return { ...state, correctAns: action.val };
    case 'score':
      return { ...state, score: action.val };
  }
}

async function getWords() {
  const rawWords = await fetch('http://localhost:4000/words');
  const wordsJson = await rawWords.json();
  localStorage.setItem('words', JSON.stringify(wordsJson));
  return wordsJson;
}
export function GameProvider(props: any) {
  const [state, dispatch] = useReducer(gameReducer, initial);
  useEffect(() => {
    const { name, avatar, words, currentWord, score, correctAns } = fetchFromStorage([
      'name',
      'avatar',
      'words',
      'currentWord',
      'score',
      'correctAns',
    ]);
    if (name && avatar && words) {
      dispatch({
        type: 'syncWithStorage',
        val: {
          name: name,
          words: JSON.parse(words),
          avatar,
          currentWord: currentWord ? +currentWord : 0,
          score: score ? +score : 0,
          correctAns: correctAns ? +correctAns : 0,
          isRunningGame: true,
        },
      });
    }
  }, []);

  const getNextWord = useCallback(() => {
    const length = state.words.length ? state.words.length : 0;
    const nextWordIndex = state.currentWord + 1;
    localStorage.setItem('currentWord', nextWordIndex);
    dispatch({ type: 'currentWord', val: nextWordIndex });
    dispatch({ type: 'progress', val: (state.currentWord / length) * 100 });
  }, [state]);
  const increaseScore = useCallback(() => {
    const newCorrectAns = state.correctAns + 1;
    const newScore = (newCorrectAns / state.words.length) * 100;
    localStorage.setItem('correctAns', `${newCorrectAns}`);
    localStorage.setItem('score', `${newScore}`);
    dispatch({ type: 'correctAns', val: newCorrectAns });
    dispatch({ type: 'score', val: newScore });
  }, [state]);
  const startGame = useCallback(
    (name: string, avatar: string) => {
      setName(name);
      setAvatar(avatar);
      dispatch({ type: 'currentWord', val: 0 });
      (async () => {
        const words = await getWords();
        dispatch({ type: 'words', val: words });
      })();
    },
    [state],
  );
  const setAvatar = useCallback(
    (avatar: string) => {
      localStorage.setItem('avatar', avatar);
      dispatch({ type: 'avatar', val: avatar });
    },
    [state],
  );
  const setName = useCallback(
    (name: string) => {
      localStorage.setItem('name', name);
      dispatch({ type: 'name', val: name });
    },
    [state],
  );
  const value = useMemo(() => {
    return {
      ...state,
      getNextWord,
      startGame,
      increaseScore,
      setName,
      setAvatar,
    };
  }, [state]);
  return <gameContext.Provider value={value} children={props.children} />;
}

export const useGameContext = () => {
  const context = useContext(gameContext);
  return context;
};
