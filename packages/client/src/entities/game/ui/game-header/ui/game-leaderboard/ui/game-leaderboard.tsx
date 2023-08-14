import { useContext, useState } from 'react';
import { GameContext } from '@@entities/game/lib/context/game-context';
import { cn } from '@@shared/lib/bem';
import { Avatar, Cell, Div, List, PopoutWrapper } from '@vkontakte/vkui';

import './styles.scss';

type GameLeaderBoardProps = {
  onClose: () => void;
};

export const GameLeaderBoard = ({ onClose }: GameLeaderBoardProps) => {
  const [animateClose, setAnimateClose] = useState(false);
  const { recordList } = useContext(GameContext);
  const cnLeaderBoard = cn('LeaderBoard');

  const closeModal = () => {
    setAnimateClose(true);

    setTimeout(onClose, 500);
  };

  return (
    <PopoutWrapper style={{ zIndex: 999 }} onClick={closeModal}>
      <Div className={cnLeaderBoard({ open: !animateClose, close: animateClose })}>
        <List>
          {recordList.map((player, i) => (
            <Cell key={i} before={<Avatar />} after={player.data.score}>
              {player.data.name}
            </Cell>
          ))}
        </List>
      </Div>
    </PopoutWrapper>
  );
};
