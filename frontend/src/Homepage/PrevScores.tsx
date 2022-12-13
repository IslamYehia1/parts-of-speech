import S from './homepage.module.scss';
import avatars from '../Avatars';
function PrevScores({ scores }: any) {
  return (
    <div className={S.scores}>
      {scores &&
        scores.map((score: any, index: number) => {
          return (
            <div key={index} className={S.score}>
              <div>
                <img className={S.avatar} src={avatars[score.avatar]} />
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
  );
}

export default PrevScores;
