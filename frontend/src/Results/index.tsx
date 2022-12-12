import Container from 'container/Container';
import Loader from 'Loader';
import { useEffect, useState } from 'react';
import S from './results.module.scss';
import { useUserContext } from '../Context/users';
import partyPopper from 'assets/images/party-popper.png';
import avatars from 'Avatar/avatars';
import { useGameContext } from 'Context/game';
function Results() {
  const isLoading = useState(false);
  const { score, words, name, avatar } = useGameContext();

  const [ranking, setRanking] = useState(null);
  const [isError, setIsError] = useState(false);
  function reset() {}
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
