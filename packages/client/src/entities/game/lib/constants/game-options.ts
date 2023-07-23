export const CANVAS_WIDTH = 3840;
export const CANVAS_HEIGHT = 2160;
export const COLORS = {
  BACKGROUND: 'white',
  FLOOR: '#d8b9aa',
  PLAYER: '#d6d7dc',
  SPIKES: '#686573',
};
export const FPS = 60;
export const FLOOR_HEIGHT = CANVAS_HEIGHT / 10; // Вычисляемое значение
export const PLAYER_START_X = 128;
export const PLAYER_SIZE_X = 128;
export const PLAYER_SIZE_Y = 176;
export const GRAVITY = 1.2;
export const PLAYER_JUMP_VELOCITY = 42;
export const SPIKES_VELOCITY = 5;
export const BACKGROUND_SPEED_COEF = 0.2;
export const INITIAL_SCORE = 1;

export enum ImageNames {
  PlayerStand = 'player_stand',
  PlayerWalk1 = 'player_walk1',
  PlayerWalk2 = 'player_wank2',

  Tree1 = 'tree1',
  Tree2 = 'tree2',
  Tree3 = 'tree3',
  Tree4 = 'tree4',

  Background = 'background',
}
export const ImageResourcesMap: Record<ImageNames, string> = {
  [ImageNames.PlayerStand]: '/assets/game/img/player_stand.png',
  [ImageNames.PlayerWalk1]: '/assets/game/img/player_walk1.png',
  [ImageNames.PlayerWalk2]: '/assets/game/img/player_walk2.png',

  [ImageNames.Tree1]: '/assets/game/img/tree_1.png',
  [ImageNames.Tree2]: '/assets/game/img/tree_2.png',
  [ImageNames.Tree3]: '/assets/game/img/tree_3.png',
  [ImageNames.Tree4]: '/assets/game/img/tree_4.png',

  [ImageNames.Background]: '/assets/game/img/background.png',
} as const;
