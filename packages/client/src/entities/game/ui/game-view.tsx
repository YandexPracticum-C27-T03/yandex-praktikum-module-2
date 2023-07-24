import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  BACKGROUND_SPEED_COEF,
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  COLORS,
  FLOOR_HEIGHT,
  FPS,
  GRAVITY,
  ImageNames,
  INITIAL_SCORE,
  PLAYER_JUMP_VELOCITY,
  PLAYER_SIZE_X,
  PLAYER_SIZE_Y,
  PLAYER_START_X,
  SPIKES_VELOCITY,
} from '../lib/constants/game-options';
import { GAME_STATUS } from '../lib/constants/game-status';
import { GameContext } from '../lib/context/game-context';
import { randomRangeInt, fillRect, ResourceLoader, drawBackground } from '../lib/utils';
import { Player, Rectangle, SpriteEntity } from '../model';
import { Canvas } from './canvas';
import { GameHeader } from './game-header';
import { GameStart } from './game-start';

type GameViewProps = {
  resourceLoader: ResourceLoader;
};

export const GameView: React.FC<GameViewProps> = ({ resourceLoader }) => {
  const [gameStatus, setGameStatus] = useState(GAME_STATUS.STOP);
  const [score, setScore] = useState(INITIAL_SCORE);
  const backgroundXRef = useRef({ x1: 0, x2: CANVAS_WIDTH });
  const spikesRef = useRef<SpriteEntity[]>([]);
  const progressRef = useRef<number>(0);

  const record = (localStorage.getItem('score') || INITIAL_SCORE) as number;

  const backgroundImg = resourceLoader.getResourceByName(ImageNames.Background);
  const playerWalk1Img = resourceLoader.getResourceByName(ImageNames.PlayerWalk1);
  const playerWalk2Img = resourceLoader.getResourceByName(ImageNames.PlayerWalk2);

  // Глобальные переменные
  const player = new Player(
    PLAYER_START_X,
    CANVAS_HEIGHT - FLOOR_HEIGHT - PLAYER_SIZE_Y,
    PLAYER_SIZE_X,
    PLAYER_SIZE_Y,
    [playerWalk1Img, playerWalk2Img],
  );
  let spawnSpikeID: NodeJS.Timer | null = null;
  let updateID: NodeJS.Timer | null = null;

  // Каждые несколько секунд за кадром появляется препятствия
  const spawnSpike = () => {
    const spikeImages = [
      resourceLoader.getResourceByName(ImageNames.Tree1),
      resourceLoader.getResourceByName(ImageNames.Tree2),
      resourceLoader.getResourceByName(ImageNames.Tree3),
      resourceLoader.getResourceByName(ImageNames.Tree4),
    ];
    progressRef.current = progressRef.current + 0.5;

    spawnSpikeID = setTimeout(spawnSpike, randomRangeInt({ min: 1000, max: 2000 }));

    // Создает препятствия
    const width = randomRangeInt({ min: 32, max: 64 });
    const height = randomRangeInt({ min: 128, max: 256 });
    const spikeImage = spikeImages[randomRangeInt({ min: 0, max: spikeImages.length - 1 })];
    const spike = new SpriteEntity(CANVAS_WIDTH, CANVAS_HEIGHT - FLOOR_HEIGHT - height, width, height, spikeImage);

    // Инициализация скорости препятствия
    // Увеличиваем скорость по мере прогресса
    spike.velocity.x = -SPIKES_VELOCITY - progressRef.current;

    // Пушит в массив препятствие
    spikesRef.current.push(spike);
  };

  const update = () => {
    updateID = setTimeout(update, 1 / FPS);

    backgroundXRef.current.x1 -= Math.ceil((SPIKES_VELOCITY + progressRef.current) * BACKGROUND_SPEED_COEF);
    backgroundXRef.current.x2 -= Math.ceil((SPIKES_VELOCITY + progressRef.current) * BACKGROUND_SPEED_COEF);

    // Обновляет игрока
    player.update();

    // Не позволяйте игроку опускаться ниже уровня пола
    if (player.y > CANVAS_HEIGHT - FLOOR_HEIGHT - player.h) {
      player.y = CANVAS_HEIGHT - FLOOR_HEIGHT - player.h;
      player.isGrounded = true;
    }

    // Препятствия
    spikesRef.current.forEach((spike) => {
      // TODO: Fix this; Тут костыль, чтоб ускорение работало для всех препятствий, а не так, что одно быстрее приближается :)
      // Нужно сделать общую скорость и её повышение
      spike.velocity.x = -SPIKES_VELOCITY - progressRef.current;

      // Обновляет препятствие
      spike.update();

      // Проверка: произошло ли столкновение игрока с препятствием
      if (Rectangle.areColliding({ player, spike })) {
        // Game over
        stop();
      }
    });

    // Удаляет препятствиея за границей экрана
    spikesRef.current = spikesRef.current.filter((spike) => spike.x > -spike.w);
  };

  // Возвращает параметры игры к исходному состоянию
  const reset = useCallback(() => {
    // Обновляем состояние игры
    setGameStatus(GAME_STATUS.START);

    // Сброс игрока
    player.y = CANVAS_HEIGHT - FLOOR_HEIGHT - PLAYER_SIZE_Y;
    player.velocity.y = 0;

    // Удаление препятствий
    spikesRef.current = [];

    // Сброс таймера до начального
    setScore(INITIAL_SCORE);

    // Запускает обновления
    update();
    spawnSpike();
  }, []);

  // Останавливает игру, и ждет рестарта
  const stop = useCallback(() => {
    setGameStatus(GAME_STATUS.RESTART);
    clearTimeout(updateID as NodeJS.Timer);
    clearTimeout(spawnSpikeID as NodeJS.Timer);
    progressRef.current = 0;
  }, []);

  // Запускает игру
  const start = useCallback(() => {
    setGameStatus(GAME_STATUS.START);
    update();
    spawnSpike();
  }, []);

  const drawInfinityBackground = (ctx: CanvasRenderingContext2D) => {
    // Если первое изображение полностью вышло за пределы экрана помещаем его в конец экрана
    if (backgroundXRef.current.x1 <= -ctx.canvas.width) {
      backgroundXRef.current.x1 = ctx.canvas.width;
    }

    // Если второе изображение полностью вышло за пределы экрана помещаем его в конец экрана
    if (backgroundXRef.current.x2 <= -ctx.canvas.width) {
      backgroundXRef.current.x2 = ctx.canvas.width;
    }

    // Рисуем фон #1
    drawBackground({
      ctx,
      image: backgroundImg,
      xShift: backgroundXRef.current.x1,
    });

    // Рисуем фон #2
    drawBackground({
      ctx,
      image: backgroundImg,
      xShift: backgroundXRef.current.x2,
    });
  };

  const draw = (ctx: CanvasRenderingContext2D) => {
    requestAnimationFrame(() => draw(ctx));

    // Рисует бесконечный фон
    drawInfinityBackground(ctx);

    // Рисует пол
    fillRect({ ctx, x: 0, y: CANVAS_HEIGHT - FLOOR_HEIGHT, w: CANVAS_WIDTH, h: FLOOR_HEIGHT, color: COLORS.FLOOR });

    // Рисует препятствие
    spikesRef.current.forEach((spike) => spike.draw(ctx));

    // Рисует игрока
    player.draw(ctx);
  };

  const init = useCallback((ctx: CanvasRenderingContext2D) => {
    // Инициализация объектов
    player.acceleration.y = GRAVITY;

    // События
    document.addEventListener('keydown', (e) => {
      if (player.isGrounded && (e.code === 'ArrowUp' || e.code === 'KeyW' || e.code === 'Space')) {
        player.velocity.y = -PLAYER_JUMP_VELOCITY;
        player.isGrounded = false;
      }
    });

    draw(ctx);
  }, []);

  // Обновляем счетчик
  useEffect(() => {
    const timer = setInterval(() => {
      setScore((prev) => prev + 1);
    }, 1000);

    if (gameStatus === GAME_STATUS.STOP || gameStatus === GAME_STATUS.RESTART) {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [score, gameStatus]);

  // Если рекорд - обновляем
  useEffect(() => {
    if (gameStatus === GAME_STATUS.RESTART && record < score) {
      localStorage.setItem('score', score.toString());
    }
  }, [gameStatus, record, score]);

  return (
    <GameContext.Provider value={{ gameStatus, start, reset, score }}>
      <GameHeader />
      <GameStart />
      <Canvas width={CANVAS_WIDTH} height={CANVAS_HEIGHT} draw={init} />
    </GameContext.Provider>
  );
};
