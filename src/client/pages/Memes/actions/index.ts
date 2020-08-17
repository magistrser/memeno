import { InitMemesAction, initMemes } from './InitMemes';
import { SwipeMemesAction, swipeMemes } from './SwipeEnd';
import { SwipeEndAction, swipeEnd } from './SwipeMemes';

const actions = { initMemes, swipeMemes, swipeEnd };
export default actions;

export type Actions = InitMemesAction | SwipeMemesAction | SwipeEndAction;
