/*
    The strategy for generating random words from the list of words
    with at least 1 word from each category is to pick 1 random word 
    from each category then add random words from random categories, 
    then shuffle the array. 
*/
type posMapT = Map<string, Array<string>>;
type wordObjT = { pos: string; word: string };
type wordsArrT = Array<wordObjT>;
function generatePosMap(wordsArr: wordsArrT): posMapT {
  const map = new Map<string, Array<string>>();
  wordsArr.forEach((wordObj: wordObjT) => {
    const POS = wordObj.pos;
    const word = wordObj.word;
    if (map.has(POS)) map.set(POS, [...map.get(POS), word]);
    else map.set(POS, [word]);
  });
  return map;
}
// We need 1 unique word from each part of speech
function getWordFromEachPos(posMap: posMapT) {
  const words = [];
  posMap.forEach((pos: Array<{}>, key: string) => {
    const randomWordIndex = Math.floor(Math.random() * pos.length);
    words.push({
      word: pos[randomWordIndex],
      pos: key,
    });
    // Delete the word after we've added it to the list to avoid duplicates
    pos.splice(randomWordIndex, 1);
  });
  return words;
}

function getRandomWords(posMap: posMapT, number: number) {
  const randomWords = [];
  for (let i = 0; i < number; i++) {
    const posArr = Array.from(posMap.keys());
    const randomPosIndex = Math.floor(Math.random() * posMap.size);
    const randomPos = posArr[randomPosIndex];
    const randomPOSWords = posMap.get(randomPos);
    const randomWordIndex = Math.floor(Math.random() * randomPOSWords.length);
    randomWords[i] = {
      word: randomPOSWords[randomWordIndex],
      pos: randomPos,
    };
    // Delete the word after we've added it to the list to avoid duplicates
    randomPOSWords.splice(randomWordIndex, 1);
    if (!(randomPOSWords.length > 0)) {
      posMap.delete(randomPos);
    }
  }
  return randomWords;
}

function shuffle(array: Array<{}>) {
  let currentIndex = array.length,
    randomIndex;
  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
}
export default function generateRandomWordsArr(wordsList: Array<wordObjT>, number: number) {
  const randomWords = [];
  const posMap = generatePosMap(wordsList);
  const wordFromEachPos = getWordFromEachPos(posMap);
  const theRestWords = getRandomWords(posMap, number - wordFromEachPos.length);
  randomWords.push(...wordFromEachPos, ...theRestWords);
  shuffle(randomWords);
  return randomWords;
}
