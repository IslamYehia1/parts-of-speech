import Container from '../container/Container';
import S from './homepage.module.scss';
import { useState, useEffect } from 'react';
import Avatar from './Avatars';
import { useNavigate } from 'react-router-dom';
import { useGameContext } from 'Context';
import PrevScores from './PrevScores';
function Homepage() {
  const navigate = useNavigate();
  const { getPrevScores, isRunningGame, name, startGame, resetGame } = useGameContext();
  const [scores, setScores] = useState([]);
  const [nameVal, setNameVal] = useState('');
  const [avatarVal, setAvatarVal] = useState(0);
  const [displayError, setDisplayError] = useState(false);
  useEffect(() => {
    setScores(getPrevScores());
  }, [getPrevScores]);
  function continueGame() {
    navigate('/game');
  }
  function restartGame() {
    resetGame();
    navigate('/');
  }
  function submit(e: any) {
    e.preventDefault();
    startGame(nameVal, avatarVal);
    navigate('/game');
  }
  return (
    <Container className={S.appWrapper}>
      <h1 className={S.title}>
        <span>Part Of Speech</span>
      </h1>
      <div className={S.wrapper}>
        {isRunningGame && (
          <div className={S.continueGame}>
            <h3>Hi {name}, You Already have a running game</h3>
            <div className={S.buttons}>
              <button onClick={() => continueGame()}>Continue</button>
              <button onClick={() => restartGame()}>Restart Game</button>
            </div>
          </div>
        )}
        {!isRunningGame && (
          <form className={S.signInForm} onSubmit={submit}>
            <div className={S.avatar}>
              <Avatar selected={avatarVal} onSelect={(avatar: any) => setAvatarVal(avatar)} />
            </div>
            <label>
              Your Name
              <input
                onChange={(e) => setNameVal(e.target.value)}
                placeholder="Enter your name"
                type="text"
                value={nameVal}
              />
            </label>
            {displayError && <div className={S.error}>{displayError}</div>}
            <div className={S.startBtnWrapper}>
              <button className={S.startGameBtn} type="submit">
                <span>Start Game</span>
              </button>
            </div>
          </form>
        )}
      </div>
      <div className={S.scoresWrapper}>
        <h2>Previous Attempts</h2>
        {!(scores && scores.length) && <div>You haven't completed any games yet!</div>}
        <PrevScores scores={scores} />
      </div>
    </Container>
  );
}
export default Homepage;
