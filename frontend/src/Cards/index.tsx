import { useState, useEffect } from 'react';
import S from './cards.module.scss';
// import * as Multiple from 'multiple.js';
function Cards(props: any) {
  const [selectedAns, setSelectedAns] = useState(false);

  function selectAns(option: any) {}

  return (
    <div className={S.posOptions}>
      <div className={S.cards}>
        {props.posOptions.map(({ pos }: any, index: number) => {
          const isSelectedAns = props.isDisabled && selectedAns === pos;
          const isCorrectAns = isSelectedAns && props.isCorrect === true ? true : null;
          return (
            <div
              tabIndex={0}
              className={`${S.card} ${props.isDisabled && S.disabled} ${isSelectedAns && S.flipped}`}
              // onClick={() => !props.disabled && selectAns(option)}
              onClick={() => {
                props.onAnsSelect(pos);
                setSelectedAns(pos);
              }}
              key={index}
            >
              {/* ${option.isCorrect ? S.correct : S.wrong} */}
              <div className={`${S.cardFace}`}>
                <span className={S.option}>{pos}</span>
              </div>
              <div className={`${S.cardBack} ${isCorrectAns ? S.correct : S.wrong}`}>
                {isCorrectAns ? 'Correct' : 'Wrong'}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default Cards;
