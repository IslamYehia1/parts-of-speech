import { useState, useEffect } from 'react';
import S from './cards.module.scss';
// import * as Multiple from 'multiple.js';
function Cards(props: any) {
  const [isDisabled, setIsDisabled] = useState(false);
  const [selectedAns, setSelectedAns] = useState(false);
  useEffect(() => {
    console.log(props.isCorrect);
  }, [props.isCorrect]);
  function selectAns(option: any) {}

  return (
    <div className={S.posOptions}>
      <div className={S.cards}>
        {props.posOptions.map(({ pos }: any, index: number) => {
          const isSelectedAns = selectedAns === pos;
          const isCorrectAns = isSelectedAns && props.isCorrect === true ? true : null;
          return (
            <div
              className={`${S.card} ${isDisabled && S.disabled} ${isSelectedAns && S.flipped}`}
              // onClick={() => !props.disabled && selectAns(option)}
              onClick={() => {
                props.onAnsSelect(pos);
                setSelectedAns(pos);
                setIsDisabled(true);
              }}
              key={index}
            >
              {/* ${option.isCorrect ? S.correct : S.wrong} */}
              <div className={`${S.cardFace}`}>
                <span className={S.option}>{pos}</span>
              </div>
              <div className={`${S.cardBack} ${isCorrectAns ? S.correct : S.wrong}`}>LOOOL</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default Cards;
