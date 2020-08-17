import Rating from '../../business-logic/mem-provider/Rating';
import { MemClient } from '../../../api/responses';

export const INIT_MEMES_ACTION = 'init-memes';
export type InitMemesPayload = {
    currentMem: MemClient;
    prevMem: MemClient;
};
type InitMemes = {
    type: typeof INIT_MEMES_ACTION;
    payload: InitMemesPayload;
};
export const initMemes = (payload: InitMemesPayload) => {
    return { type: INIT_MEMES_ACTION, payload };
};

export const SWIPE_MEMES_ACTION = 'swipe-memes';
export type SwipeMemesPayload = {
    rating: Rating;
    currentMem: MemClient;
    prevMem: MemClient;
};
type SwipeMemesAction = {
    type: typeof SWIPE_MEMES_ACTION;
    payload: SwipeMemesPayload;
};
export const swipeMemes = (payload: SwipeMemesPayload) => {
    return { type: SWIPE_MEMES_ACTION, payload };
};

export const SWIPE_END_ACTION = 'swipe-end';
type SwipeEndAction = {
    type: typeof SWIPE_END_ACTION;
};
export const swipeEnd = () => {
    return { type: SWIPE_END_ACTION };
};

export type Action = InitMemes | SwipeMemesAction | SwipeEndAction;
