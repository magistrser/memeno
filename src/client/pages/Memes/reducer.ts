import Rating from '../../business-logic/mem-provider/Rating';
import { MemClient } from '../../../api/responses';
import { SpecialMemes } from '../../business-logic/mem-provider/resources-folder-mem-provider/SpecialMemes';
import { Actions } from './actions';
import { INIT_MEMES_ACTION } from './actions/InitMemes';
import { SWIPE_MEMES_ACTION } from './actions/SwipeEnd';
import { SWIPE_END_ACTION } from './actions/SwipeMemes';

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

export default (state: StateType = initState, action: Actions): StateType => {
    switch (action.type) {
        case INIT_MEMES_ACTION:
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
