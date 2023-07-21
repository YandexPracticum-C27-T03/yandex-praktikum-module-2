const key = {
  fullscreenEnabled: 0,
  fullscreenElement: 1,
  requestFullscreen: 2,
  exitFullscreen: 3,
  fullscreenchange: 4,
  fullscreenerror: 5,
  fullscreen: 6,
} as Record<string, number>;

const webkit = [
  'webkitFullscreenEnabled',
  'webkitFullscreenElement',
  'webkitRequestFullscreen',
  'webkitExitFullscreen',
  'webkitfullscreenchange',
  'webkitfullscreenerror',
  '-webkit-full-screen',
] as string[];

const moz = [
  'mozFullScreenEnabled',
  'mozFullScreenElement',
  'mozRequestFullScreen',
  'mozCancelFullScreen',
  'mozfullscreenchange',
  'mozfullscreenerror',
  '-moz-full-screen',
] as string[];

const ms = [
  'msFullscreenEnabled',
  'msFullscreenElement',
  'msRequestFullscreen',
  'msExitFullscreen',
  'MSFullscreenChange',
  'MSFullscreenError',
  '-ms-fullscreen',
] as string[];

const document =
  typeof window !== 'undefined' && typeof window.document !== 'undefined'
    ? window.document
    : {
        exitFullscreen() {
          console.warn('document dosent exist in server');
        },
        fullscreenEnabled: false,
        fullscreenElement: null,
      };

const vendor =
  ('fullscreenEnabled' in document && Object.keys(key)) ||
  (webkit[0] in document && webkit) ||
  (moz[0] in document && moz) ||
  (ms[0] in document && ms) ||
  [];

export const fscreen = {
  requestFullscreen: (element: HTMLElement) => element.requestFullscreen(),

  async exitFullscreen() {
    return (document as Document).exitFullscreen.bind(document);
  },

  addEventListener: (type: string, handler: () => void) =>
    (document as Document).addEventListener(vendor[key[type]], handler),

  removeEventListener: (type: string, handler: () => void) =>
    (document as Document).removeEventListener(vendor[key[type]], handler),

  get fullscreenEnabled(): boolean {
    return Boolean((document as Document).fullscreenEnabled);
  },

  get fullscreenElement() {
    return (document as Document).fullscreenElement;
  },
};
