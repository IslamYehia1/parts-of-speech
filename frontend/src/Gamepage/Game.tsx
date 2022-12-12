import Container from '../container/Container';
import S from './gamepage.module.scss';
import { useState, useEffect, useRef } from 'react';
import Loader from '../Loader';
import Cards from '../Cards';
import avatars from '../Avatar/avatars';
import BoardWrapper from './BoardWrapper';
import { useUserContext } from 'Context/users';
import { useGameContext } from 'Context/game';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as FromBlob } from '../assets/fromBlobV.svg';
const posOptions: any = [{ pos: 'verb' }, { pos: 'noun' }, { pos: 'adverb' }, { pos: 'adjective' }];
function Game() {
  const [fetchState, setFetchState] = useState('');
  const { name, avatar, words, currentWord, progress, getNextWord, increaseScore } = useGameContext();
  const navigate = useNavigate();
  const blobRef = useRef(null);
  const [{ selectedAns, isDisabled }, setGame] = useState({
    selectedAns: null,
    isDisabled: false,
  });
  const [{ word, pos }, setCurrentWord] = useState({ word: '', pos: '' });
  useEffect(() => {
    // const box = blobRef.current as any;
    // const blobSVG = document.querySelector('#from_blob path');
    // let boxBoundingRect = box.getBoundingClientRect();
    // let boxCenter = {
    //   x: boxBoundingRect.left + boxBoundingRect.width / 2,
    //   y: boxBoundingRect.top + boxBoundingRect.height / 2,
    // };
    // console.log('PAATH', blobSVG);
    // document.addEventListener('mousemove', (e) => {
    //   const xDistance = e.pageX - boxCenter.x;
    //   let angle = Math.atan2(e.pageX - boxCenter.x, -(e.pageY - boxCenter.y)) * (180 / Math.PI);
    //   box.style.transform = `rotate(${angle}deg)`;
    // });
    // (async () => {
    //   const words = await getWords();
    //   //   setwords(words);
    // })();
  }, []);
  useEffect(() => {
    if (words && words.length > 1) {
      setCurrentWord(words[currentWord]);
    }
  }, [currentWord, words]);

  function goHome() {}

  return (
    <Container className={S.container}>
      {!(words && words.length > 1) && (
        <div className={S.loaderWrapper}>
          <Loader />
        </div>
      )}
      {fetchState == 'error' && <div>Couldn't load the game, please try again</div>}
      {/* {fetchState == 'success' && ( */}
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
              <div
                className={S.progressBarFull}
                role="progressbar"
                style={{ width: `${progress}%` }}
                //   aria-valuenow="25"
                //   aria-valuemin="0"
                //   aria-valuemax="100"
              ></div>
            </div>
          </div>
          {/* <div ref={blobRef} className={S.blob}>
            <FromBlob />
          </div> */}
          <BoardWrapper word={word} />
          <div className={S.cards}>
            <Cards
              posOptions={posOptions}
              isCorrect={selectedAns === pos}
              onAnsSelect={(ans: any) => {
                if (ans === pos) {
                  increaseScore();
                }
                setGame((curr) => {
                  return {
                    ...curr,
                    selectedAns: ans,
                    isDisabled: true,
                  };
                });
                setTimeout(() => {
                  if (currentWord < words.length - 1) {
                    // setcurrentWordI((curr) => curr + 1);
                    getNextWord();
                    setGame((curr) => {
                      return {
                        ...curr,
                        isDisabled: false,
                      };
                    });
                  } else {
                    navigate('/results');
                  }
                }, 1000);
              }}
              isDisabled={isDisabled}
            />
          </div>
        </div>
      )}
    </Container>
  );
}
export default Game;
