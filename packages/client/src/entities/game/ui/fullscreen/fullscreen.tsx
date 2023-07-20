import { useFullscreen } from '@@shared/hooks/useFullscreen';
import { Button } from '@vkontakte/vkui';

export const FullScreen = () => {
  const handle = useFullscreen();
  return <Button onClick={() => handle.enter}>test</Button>;
};
