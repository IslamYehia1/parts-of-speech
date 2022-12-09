import Container from '../container/Container';
import S from './homepage.module.scss';
import { useState, useEffect } from 'react';
import Avatar from '../Avatar';
import avatars from '../Avatar/avatars';
import { useNavigate } from 'react-router-dom';
function Homepage() {
  const now = new Date();
  const navigate = useNavigate();
  const [scores, setScores] = useState<Array<{}> | null>([
    {
      name: 'islam',
      avatar: avatars[0],
      score: '20',
      date: `${now.getDate()}/${now.getMonth()}/${now.getFullYear()}`,
      time: now.toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      }),
    },
  ]);
  const [isExistingGame, setIsExistingGame] = useState(false);
  const [existingName, setExistingName] = useState('');
  const [name, setName] = useState('');
  const [displayError, setDisplayError] = useState(false);
  useEffect(() => {
    const localName = localStorage.getItem('name');
    if (localName) setExistingName(existingName);
    const localScores = JSON.parse(localStorage.getItem('scoresList')!);
    if (Array.isArray(localScores)) setScores(localScores);
  }, []);
  function continueGame() {}
  function restartGame() {}
  function submit(e: any) {
    e.preventDefault();
    navigate('/game');
    console.log(name);
  }
  return (
    <Container className={S.appWrapper}>
      <h1 className={S.title}>
        <span>Part Of Speech</span>
      </h1>
      <div className={S.wrapper}>
        {isExistingGame && (
          <div className={S.continueGame}>
            <h3>Hi {existingName}, You Already have a running game</h3>
            <div className={S.buttons}>
              <button onClick={() => continueGame()}>Continue</button>
              <button onClick={() => restartGame()}>Restart Game</button>
            </div>
          </div>
        )}
        {!isExistingGame && (
          <form className={S.signInForm} onSubmit={submit}>
            <div className={S.avatar}>
              <Avatar />
            </div>
            <label>
              Your Name
              <input onChange={(e) => setName(e.target.value)} placeholder="Enter your name" type="text" value={name} />
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
        <div className={S.scores}>
          {scores &&
            scores.map((score: any) => {
              return (
                <div className={S.score}>
                  <div>
                    <img className={S.avatar} src={score.avatar} />
                    <div className={S.name}>{score.name}</div>
                  </div>
                  <div>{score.score}%</div>
                  <div>
                    On {score.date} At {score.time}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </Container>
  );
}
export default Homepage;
