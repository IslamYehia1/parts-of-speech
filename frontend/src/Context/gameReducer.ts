export const initialState = {
  words: [],
  progress: 0,
  currentWord: 0,
  name: '',
  avatar: 0,
  score: 0,
  correctAns: 0,
  isRunningGame: false,
};
export function gameReducer(state: typeof initialState, action: any) {
  switch (action.type) {
    case 'syncWithStorage':
      return { ...state, ...action.val };
    case 'startGame':
      return {
        ...initialState,
        name: action.name,
        avatar: action.avatar,
        words: action.words,
        isRunningGame: true,
      };
    case 'finishGame':
      return {
        ...state,
        words: [],
        progress: 0,
        currentWord: 0,
        correctAns: 0,
        isRunningGame: false,
      };
    case 'reset':
      return initialState;
    case 'currentWord':
      return { ...state, currentWord: action.val };
    case 'progress':
      return { ...state, progress: action.val };
    case 'correctAns':
      return { ...state, correctAns: action.val };
    case 'score':
      return { ...state, score: action.val };
    case 'isRunningGame':
      return { ...state, isRunningGame: action.val };
  }
}
