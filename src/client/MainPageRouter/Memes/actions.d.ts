import Rating from '../../business-logic/mem-provider/rating';
import { MemClient } from '../../../api/responses';

type InitMemes = {
    type: 'init-memes';
    payload: {
        currentMem: MemClient;
        prevMem: MemClient;
    };
};
type SwipeMemesAction = {
    type: 'swipe-memes';
    payload: {
        rating: Rating;
        currentMem: MemClient;
        prevMem: MemClient;
    };
};
type SwipeEndAction = {
    type: 'swipe-end';
};

export type Action = InitMemes | SwipeMemesAction | SwipeEndAction;
