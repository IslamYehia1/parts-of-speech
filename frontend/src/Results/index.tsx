import Container from 'container/Container';
import Loader from 'Loader';
import { useEffect, useState } from 'react';
import S from './results.module.scss';
import partyPopper from 'assets/images/party-popper.png';
import avatars from '../Avatars';
import { useGameContext } from 'Context';
import { useNavigate } from 'react-router-dom';
function Results() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { score, name, avatar, resetGame } = useGameContext();
  const [ranking, setRanking] = useState(null);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    if (!score) return;
    (async () => {
      try {
        setIsLoading(true);
        const rawRes = await fetch('http://localhost:4000/rank', {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({ score: score }),
        });
        const rankJson = await rawRes.json();
        const rank = rankJson.ranking;
        setIsLoading(false);
        setRanking(rank);
      } catch (error) {
        setIsError(true);
      }
    })();
  }, [score]);
  function reset() {
    resetGame();
    navigate('/');
  }
  return (
    <Container className={S.appWrapper}>
      <h1 className={S.title}>
        <span>Test Results</span>
      </h1>
      <div className={S.loader}>{isLoading && <Loader />}</div>
      {isError && <div>Couldn't get the ranking for now</div>}
      <div className={S.rankWrapper}>
        <div className={S.rank}>
          <img className={S.partyIcon} src={partyPopper} />
          Congratulations! You beat <span>{ranking}</span> % of the submissions
        </div>
      </div>
      <div className={S.results}>
        <div>
          <img className={S.avatar} src={avatars[avatar]} />
          <div>{name}</div>
        </div>
        <div>Your Score : {score}%</div>
        <button className={S.resetBtn} onClick={() => reset()}>
          Try Again
        </button>
      </div>
    </Container>
  );
}
export default Results;
