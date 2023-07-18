import { useEffect } from 'react';
import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  COLORS,
  FLOOR_HEIGHT,
  FPS,
  GRAVITY,
  PLAYER_JUMP_VELOCITY,
  PLAYER_SIZE,
  PLAYER_START_X,
  SPIKES_VELOCITY,
} from '../lib/constants/game-options';
import { randomRangeInt, fill, fillRect } from '../lib/utils';
import { Entity, Player, Rectangle } from '../model';
import { Canvas } from './canvas';

export const GameView = () => {
  // Глобальные переменные
  const player = new Player(PLAYER_START_X, CANVAS_HEIGHT - FLOOR_HEIGHT - PLAYER_SIZE, PLAYER_SIZE, PLAYER_SIZE);
  let spikes: Entity[] = [];
  let spawnSpikeID: NodeJS.Timer | null = null;
  let updateID: NodeJS.Timer | null = null;
  let score = 0;

  // Каждые несколько секунд за кадром появляется препятствия
  const spawnSpike = () => {
    spawnSpikeID = setTimeout(spawnSpike, randomRangeInt({ min: 3000, max: 6000 }));

    // Создает препятствия
    const width = randomRangeInt({ min: 32, max: 64 });
    const height = randomRangeInt({ min: 128, max: 256 });
    const spike = new Entity(CANVAS_WIDTH, CANVAS_HEIGHT - FLOOR_HEIGHT - height, width, height);

    // Инициализация скорости препятствия
    spike.velocity.x = -SPIKES_VELOCITY;

    // Пушит в массив препятствие
    spikes.push(spike);
  };

  const update = () => {
    updateID = setTimeout(update, 1 / FPS);

    // Обновляет игрока
    player.update();

    // Не позволяйте игроку опускаться ниже уровня пола
    if (player.y > CANVAS_HEIGHT - FLOOR_HEIGHT - player.h) {
      player.y = CANVAS_HEIGHT - FLOOR_HEIGHT - player.h;
      player.isGrounded = true;
    }

    // Препятствия
    spikes.forEach((spike) => {
      // Обновляет препятствие
      spike.update();

      // Проверяет столкнулся ли игрок с препятствием
      if (Rectangle.areColliding({ player, spike })) {
        // Game over
        stop();
      }
    });

    // Удаляет препятствиея за границей экрана
    spikes = spikes.filter((spike) => spike.x > -spike.w);
  };

  // Возвращает параметры игры к исходному состоянию
  const reset = () => {
    // Сброс игрока
    player.y = CANVAS_HEIGHT - FLOOR_HEIGHT - PLAYER_SIZE;
    player.velocity.y = 0;

    // Удаление препятсвий
    spikes = [];

    // Запускает обновления
    update();
    spawnSpike();
  };

  // Сброс
  const tryReset = (e: KeyboardEvent) => {
    if (e.code === 'ArrowUp' || e.code === 'KeyW' || e.code === 'Space') {
      // Удаляет события рестарта
      document.removeEventListener('keydown', tryReset);
      // Рестартит игру
      reset();
    }
  };

  // Останавливает игру, и ждет рестарта
  const stop = () => {
    clearTimeout(updateID as NodeJS.Timer);
    clearTimeout(spawnSpikeID as NodeJS.Timer);

    // Добавляет события для рестрата игры
    document.addEventListener('keydown', tryReset);
  };

  const draw = (ctx: CanvasRenderingContext2D) => {
    requestAnimationFrame(() => draw(ctx));

    // Рисует фон
    fill({ ctx, color: COLORS.BACKGROUND });

    // Рисует пол
    fillRect({ ctx, x: 0, y: CANVAS_HEIGHT - FLOOR_HEIGHT, w: CANVAS_WIDTH, h: FLOOR_HEIGHT, color: COLORS.FLOOR });

    // Рисует препятствие
    spikes.forEach((spike) => spike.draw({ ctx, color: COLORS.SPIKES }));

    // Рисует очки
    ctx.font = '30px Arial';
    ctx.fillText(score.toString(), 10, 50);

    // Рисует игрока
    player.draw({ ctx, color: COLORS.PLAYER });
  };

  const init = (ctx: CanvasRenderingContext2D) => {
    // Инициализация объектов
    player.acceleration.y = GRAVITY;

    // События
    document.addEventListener('keydown', (e) => {
      if (player.isGrounded && (e.code === 'ArrowUp' || e.code === 'KeyW' || e.code === 'Space')) {
        player.velocity.y = -PLAYER_JUMP_VELOCITY;
        player.isGrounded = false;
      }
    });

    update();
    draw(ctx);
    spawnSpike();
  };

  useEffect(() => {
    const timer = setInterval(() => {
      score++;
    }, 1000);

    return () => clearInterval(timer);
  }, [score]);

  return <Canvas width={CANVAS_WIDTH} height={CANVAS_HEIGHT} draw={init} />;
};