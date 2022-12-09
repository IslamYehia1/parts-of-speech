import { Router } from 'express';
import { getRanking } from './utils/getRanking';
import generateRandomWordsArr from './utils/getRandomWords';
import { wordsList, scoresList } from './utils/dataProvider';

const router = Router();
router.get('/words', (req, res) => {
  try {
    const randomWords = generateRandomWordsArr(wordsList, 10);
    res.send(randomWords);
  } catch (e) {
    console.log(e);
    res.send({ error: 'Something went wrong while generating the random words array' });
  }
});
router.post('/rank', (req, res) => {
  const reqScore = req.body.score;
  // Sanity check
  if (reqScore > 100 || reqScore < 0) {
    res.send({ ranking: 0 });
  }
  // This route takes the user score and returns the rank
  // rounded to the nearest hundredth
  try {
    const ranking = getRanking(scoresList, reqScore);
    res.send({ ranking: ranking });
  } catch (e) {
    console.log("Couldnt' get ranking");
    res.send({ ranking: 0 });
  }
});

export default router;
