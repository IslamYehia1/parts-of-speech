import Container from '../container/Container';
import S from './gamepage.module.scss';
import { useState, useEffect, useRef } from 'react';
import Loader from '../Loader';
import Cards from '../Cards';
import avatars from '../Avatars';
import BoardWrapper from './BoardWrapper';
import { useGameContext } from 'Context';
import { useNavigate } from 'react-router-dom';
const posOptions: any = [{ pos: 'verb' }, { pos: 'noun' }, { pos: 'adverb' }, { pos: 'adjective' }];
function Game() {
  const navigate = useNavigate();
  const { name, avatar, words, currentWord, progress, getNextWord, increaseScore, resetGame, finishGame } =
    useGameContext();
  const [{ word, pos }, setCurrentWord] = useState({ word: '', pos: '' });
  const [{ selectedAns, isDisabled }, setState] = useState({
    selectedAns: '',
    isDisabled: false,
  });

  useEffect(() => {
    if (words && words.length > 1) {
      setCurrentWord(words[currentWord]);
    }
  }, [currentWord, words]);

  function handleAnsSelect(ans: string) {
    if (ans === pos) {
      increaseScore();
    }
    setState((curr) => {
      return {
        selectedAns: ans,
        isDisabled: true,
      };
    });
    setTimeout(() => {
      if (currentWord < words.length - 1) {
        getNextWord();
        setState((curr) => {
          return {
            ...curr,
            isDisabled: false,
          };
        });
      } else {
        finishGame();
        navigate('/results');
      }
    }, 1000);
  }

  function goHome() {
    navigate('/');
  }

  return (
    <Container className={S.container}>
      {!(words && words.length > 1) && (
        <div className={S.loaderWrapper}>
          <Loader />
        </div>
      )}
      {words && words.length > 1 && (
        <div>
          <div className={S.header}>
            <div className={S.row}>
              <div onClick={() => goHome()} className={S.name}>
                <div className={S.avatarWrapper}>
                  <img src={avatars[avatar]} />
                </div>
                <span>{name}</span>
              </div>
              <div className={S.title}>Select the correct POS</div>
              <div className={S.gameProgress}>
                Word {currentWord + 1} /{words && words.length}
              </div>
            </div>
            <div className={S.progressBarWrapper}>
              <div className={S.progressBarFull} role="progressbar" style={{ width: `${progress}%` }}></div>
            </div>
          </div>

          <BoardWrapper word={word} />
          <div className={S.cards}>
            <Cards
              posOptions={posOptions}
              isCorrect={selectedAns === pos}
              onAnsSelect={handleAnsSelect}
              isDisabled={isDisabled}
            />
          </div>
        </div>
      )}
    </Container>
  );
}
export default Game;
