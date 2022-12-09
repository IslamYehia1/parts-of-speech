import { useState, useEffect, useRef } from 'react';
import S from './gamepage.module.scss';

function GameWrapper(props: any) {
  const wordCont = useRef(null);
  const wordCard = useRef(null);
  useEffect(() => {
    setTimeout(() => {
      const container: any = wordCont.current;
      const card: any = wordCard.current;
      container.addEventListener('mouseleave', function () {
        card.style.transform = `rotateX(0deg) rotateY(0deg)`;
        //   card.style.background = `radial-gradient(circle at 50% 50%, #0df, #07d)`;
        card.style.transition = `all 1s`;
      });

      container.addEventListener('mouseenter', function () {
        card.style.transition = `none`;
      });

      container.addEventListener('mousemove', function (event: any) {
        const pos = {
          x: getDegrees(getPercentage(event.clientX, window.innerWidth)),
          y: getDegrees(getPercentage(event.clientY, window.innerHeight)),
        };

        card.style.transform = `rotateX(${-pos.y}deg) rotateY(${pos.x}deg)`;
        //   card.style.background = `radial-gradient(circle at ${-pos.x + 50}% ${-pos.y + 50}%, #0ce, #07d)`;
      });

      function getPercentage(num: any, total: any) {
        return (num * 100) / total;
      }

      function getDegrees(percentage: any, max = 80) {
        return (max * percentage) / 100 - max / 2;
      }
    }, 200);
  }, []);
  return (
    <div ref={wordCont} className={S.wordWrapper}>
      <div ref={wordCard} className={S.wordCard}>
        <div className={S.word}>
          <div>{props.word}</div>
        </div>
      </div>
    </div>
  );
}

export default GameWrapper;
