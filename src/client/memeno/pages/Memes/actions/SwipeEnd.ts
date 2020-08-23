import Rating from '../../../../utils/MemProvider/Rating';
import { MemClient } from '../../../../../routes/MemClient';

export const SWIPE_MEMES_ACTION = 'swipe-memes';
export type SwipeMemesPayload = {
    rating: Rating;
    currentMem: MemClient;
    prevMem: MemClient;
};
export type SwipeMemesAction = {
    type: typeof SWIPE_MEMES_ACTION;
    payload: SwipeMemesPayload;
};
export const swipeMemes = (payload: SwipeMemesPayload) => {
    return { type: SWIPE_MEMES_ACTION, payload };
};
