import Rating from '../../business-logic/mem-provider/rating';
import { MemClient } from '../../../api/responses';

type SwipeMemsAction = {
    type: 'swipe-mems';
    payload: {
        rating: Rating;
        currentMem: MemClient;
        prevMem: MemClient;
    };
};
type SwipeEndAction = {
    type: 'swipe-end';
};

export type Action = SwipeMemsAction | SwipeEndAction;
