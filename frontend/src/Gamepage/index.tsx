import Container from '../container/Container';
import S from './gamepage.module.scss';
import { useState, useEffect, useRef } from 'react';
import Loader from '../Loader';
import Cards from '../Cards';
import avatars from '../Avatar/avatars';
import BoardWrapper from './BoardWrapper';
import { useUserContext } from 'Context/users';
import { useNavigate } from 'react-router-dom';
const pos: any = [{ pos: 'verb' }, { pos: 'noun' }, { pos: 'adverb' }, { pos: 'adjective' }];
function Gamepage() {
  const [wordsList, setWordsList] = useState([{ word: 'Fastly', pos: 'verb' }]);
  const [fetchState, setFetchState] = useState('');
  const { name, avatar, getWords } = useUserContext();
  // const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const navigate = useNavigate();
  const [{ currentWordIndex, progress, selectedAns, isDisabled }, setGame] = useState({
    currentWordIndex: 0,
    progress: 0,
    selectedAns: null,
    isDisabled: false,
  });
  useEffect(() => {
    (async () => {
      const words = await getWords();
      setWordsList(words);
    })();
  }, []);
  useEffect(() => {
    console.log(progress);
  }, [progress]);

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
                  <img src={avatars[avatar]} />
                </div>
                <span>{name}</span>
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
                style={{ width: `${progress}%` }}
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
              isCorrect={selectedAns === wordsList[currentWordIndex].pos}
              onAnsSelect={(ans: any) => {
                setGame((curr) => {
                  return {
                    ...curr,
                    selectedAns: ans,
                    isDisabled: true,
                  };
                });
                setTimeout(() => {
                  if (currentWordIndex < wordsList.length - 1) {
                    // setCurrentWordIndex((curr) => curr + 1);
                    setGame((curr) => {
                      return {
                        ...curr,
                        isDisabled: false,
                        currentWordIndex: currentWordIndex + 1,
                        progress: ((currentWordIndex + 1) / wordsList.length) * 100,
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
export default Gamepage;
