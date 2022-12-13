import { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from 'react';
import { getWords } from './fetchWords';
import { fetchFromStorage, removeFromStorage, setStorage } from './connectLocalStorage';
import { gameReducer, initialState } from './gameReducer';

const initial = {
  ...initialState,
  getWords: () => {},
  getNextWord: () => {},
  startGame: (name: string, avatar: number) => {},
  finishGame: () => {},
  increaseScore: () => {},
  resetGame: () => {},
  getPrevScores: (): any => {},
};
const gameContext = createContext(initial);
export function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  useEffect(() => {
    const { name, avatar, words, currentWord, score, correctAns, isRunningGame } = fetchFromStorage([
      'name',
      'avatar',
      'words',
      'currentWord',
      'score',
      'correctAns',
      'isRunningGame',
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
          isRunningGame: isRunningGame ? true : false,
        },
      });
    }
  }, []);

  const getNextWord = useCallback(() => {
    const length = state.words.length ? state.words.length : 0;
    const nextWordIndex = state.currentWord + 1;
    localStorage.setItem('currentWord', nextWordIndex);
    dispatch({ type: 'currentWord', val: nextWordIndex });
    dispatch({ type: 'progress', val: (nextWordIndex / length) * 100 });
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
      setStorage([
        { item: 'name', value: name },
        { item: 'avatar', value: avatar },
        { item: 'words', value: '' },
      ]);
      (async () => {
        const words = await getWords();
        setStorage([
          { item: 'isRunningGame', value: '1' },
          { item: 'words', value: JSON.stringify(words) },
        ]);
        dispatch({ type: 'startGame', name: name, avatar: avatar, words: words });
      })();
    },
    [state],
  );

  const finishGame = useCallback(() => {
    let currScores: any = localStorage.getItem('prevScores');
    currScores = currScores ? JSON.parse(currScores) : [];
    const now = new Date();
    const newScore = {
      name: state.name,
      avatar: state.avatar,
      score: state.score,
      date: `${now.getDate()}/${now.getMonth()}/${now.getFullYear()}`,
      time: now.toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      }),
    };
    dispatch({ type: 'finishGame' });
    currScores.push(newScore);
    setStorage([{ item: 'prevScores', value: JSON.stringify(currScores) }]);
  }, [state]);

  const getPrevScores = useCallback(() => {
    let currScores: any = localStorage.getItem('prevScores');
    currScores = currScores ? JSON.parse(currScores) : [];
    return currScores;
  }, [state]);

  const resetGame = useCallback(() => {
    removeFromStorage(['correctAns', 'currentWord', 'isRunningGame']);
    dispatch({ type: 'reset' });
  }, [state]);

  const value = useMemo(() => {
    return {
      ...state,
      getNextWord,
      startGame,
      increaseScore,
      resetGame,
      finishGame,
      getPrevScores,
    };
  }, [state]);
  return <gameContext.Provider value={value} children={children} />;
}

export const useGameContext = () => {
  const context = useContext(gameContext);
  return context;
};
