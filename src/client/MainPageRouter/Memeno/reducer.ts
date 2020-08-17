import Rating from '../../business-logic/mem-provider/rating';
import { Action } from './actions';
import { MemClient } from '../../../api/responses';
import {SpecialMemes} from "../../business-logic/mem-provider/resources-folder-mem-provider/SpecialMemes";

type StateType = {
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
    updatingTriggerCounter: 0
};

export default (state: StateType, action: Action): StateType => {
    switch (action.type) {
        case 'init-memes':
            return {...state, ...action.payload, isSwipeEnd: true};

        case 'swipe-memes':
            return { ...state, ...action.payload, isSwipeEnd: false, updatingTriggerCounter: state.updatingTriggerCounter + 1 };

        case 'swipe-end': {
            return { ...state, isSwipeEnd: true };
        }
    }

    return state;
};
