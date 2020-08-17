import Rating from '../../business-logic/mem-provider/Rating';
import {
    Action,
    INIT_MEMES_ACTION,
    SWIPE_END_ACTION,
    SWIPE_MEMES_ACTION,
} from './actions';
import { MemClient } from '../../../api/responses';
import { SpecialMemes } from '../../business-logic/mem-provider/resources-folder-mem-provider/SpecialMemes';

export type StateType = {
    currentMem: MemClient;
    prevMem: MemClient;
    rating: Rating;
    isSwipeEnd: boolean;
    updatingTriggerCounter: number;
};

export const initState: StateType = {
    currentMem: SpecialMemes.EndMem,
    prevMem: SpecialMemes.EndMem,
    rating: Rating.Like,
    isSwipeEnd: true,
    updatingTriggerCounter: 0,
};

export default (state: StateType = initState, action: Action): StateType => {
    switch (action.type) {
        case INIT_MEMES_ACTION:
            console.log('reducer: INIT_MEMES_ACTION');
            return { ...state, ...action.payload, isSwipeEnd: true };

        case SWIPE_MEMES_ACTION:
            return {
                ...state,
                ...action.payload,
                isSwipeEnd: false,
                updatingTriggerCounter: state.updatingTriggerCounter + 1,
            };

        case SWIPE_END_ACTION: {
            return { ...state, isSwipeEnd: true };
        }
    }

    return state;
};
