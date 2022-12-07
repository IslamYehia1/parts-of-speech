import S from './avatar.module.scss';
import { useState } from 'react';
import avatars from './avatars';
function Avatar() {
  const [chosenAvatar, setChosenAvatar] = useState(0);
  return (
    <div className={S.chooseAvatar}>
      <h3>Choose Your Avatar</h3>
      <div className={S.avatarsWrapper}>
        {avatars.map((img: string, index: number) => (
          <div className={`${S.avatar} ${chosenAvatar == index && S.chosen}`} onClick={() => setChosenAvatar(index)}>
            <img src={img} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
}
export default Avatar;
