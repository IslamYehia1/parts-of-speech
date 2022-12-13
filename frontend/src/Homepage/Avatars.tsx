import S from './avatar.module.scss';
import { useState } from 'react';
import avatars from '../Avatars';
function Avatar({ selected, onSelect }: any) {
  return (
    <div className={S.chooseAvatar}>
      <h3>Choose Your Avatar</h3>
      <div className={S.avatarsWrapper}>
        {avatars.map((img: string, index: number) => (
          <div key={index} className={`${S.avatar} ${selected == index && S.chosen}`} onClick={() => onSelect(index)}>
            <img src={img} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
}
export default Avatar;
