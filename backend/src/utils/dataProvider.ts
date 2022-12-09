const { dirname } = require('path');
const appDir = dirname(require.main.filename);
export type wordsListT = [
  {
    id?: string;
    word: string;
    pos: string;
  },
];
export type scroesListT = Array<number>;

const data = require(appDir + '/../TestData.json');

export const wordsList: wordsListT = data.wordList;
export const scoresList: scroesListT = data.scoresList;
