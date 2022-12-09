import Container from '../container/Container';
import S from './gamepage.module.scss';
import { useState, useEffect, useRef } from 'react';
import Loader from '../Loader';
import Cards from '../Cards';
import avatars from '../Avatar/avatars';
import BoardWrapper from './BoardWrapper';
const pos: any = [{ pos: 'verb' }, { pos: 'noun' }, { pos: 'adverb' }, { pos: 'adjective' }];
function Gamepage() {
  const [userInfo, setUserInfo] = useState({
    name: 'Islam',
    avatar: avatars[0],
  });
  const [wordsList, setWordsList] = useState([{ word: 'Fastly', pos: 'verb' }]);
  const [fetchState, setFetchState] = useState('');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [game, setGame] = useState({
    currentWordIndex: 0,
    progress: 0,
    selectedAns: null,
    isDisabled: false,
  });
  function goHome() {}

  return (
    <Container className={S.container}>
      {fetchState == 'loading' && (
        <div className={S.loaderWrapper}>
          <Loader />
        </div>
      )}
      {fetchState == 'error' && <div>Couldn't load the game, please try again</div>}
      {/* {fetchState == 'success' && ( */}
      {true && (
        <div>
          <div className={S.header}>
            <div className={S.row}>
              <div onClick={() => goHome()} className={S.name}>
                <div className={S.avatarWrapper}>
                  <img src={userInfo.avatar} />
                </div>
                <span>{userInfo.name}</span>
              </div>
              <div className={S.title}>Select the correct POS</div>
              <div className={S.gameProgress}>
                Word {currentWordIndex + 1} /{wordsList && wordsList.length}
              </div>
            </div>
            <div className={S.progressBarWrapper}>
              <div
                className={S.progressBarFull}
                role="progressbar"
                style={{ width: `${game.progress} + %` }}
                //   aria-valuenow="25"
                //   aria-valuemin="0"
                //   aria-valuemax="100"
              ></div>
            </div>
          </div>
          <BoardWrapper word={wordsList[currentWordIndex].word} />
          <div className={S.cards}>
            <Cards
              posOptions={pos}
              isCorrect={game.selectedAns === wordsList[currentWordIndex].pos}
              onAnsSelect={(ans: any) => {
                setGame((curr) => {
                  return {
                    ...curr,
                    selectedAns: ans,
                  };
                });
              }}
              disabled={game.isDisabled}
            />
          </div>
        </div>
      )}
    </Container>
  );
}
export default Gamepage;
