import Container from '../container/Container';
import S from './homepage.module.scss';
import { useState, useEffect } from 'react';
import Avatar from '../Avatar';
import avatars from '../Avatar/avatars';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../Context/users';
function Homepage() {
  const now = new Date();
  const navigate = useNavigate();
  const { setName, setAvatar } = useUserContext();
  useEffect(() => {
    console.log('WHOHA', setName);
  }, [setName]);
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
  const [nameVal, setNameVal] = useState('');
  const [avatarVal, setAvatarVal] = useState(0);
  const [displayError, setDisplayError] = useState(false);

  function continueGame() {}
  function restartGame() {}
  function submit(e: any) {
    e.preventDefault();
    console.log('WHAT', setName);
    setName(nameVal);
    setAvatar(avatarVal);
    navigate('/game');
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
              <Avatar
                selected={avatarVal}
                onSelect={(avatar: any) => {
                  setAvatarVal(avatar);
                }}
              />
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
