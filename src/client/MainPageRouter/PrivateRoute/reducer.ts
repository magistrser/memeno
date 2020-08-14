import { Action } from './actions';

type StateType = {
    isAuth: boolean;
    isWaiting: boolean;
    isError: boolean;
};

export const initState: StateType = {
    isAuth: false,
    isWaiting: true,
    isError: false,
};

export default (state: StateType, action: Action): StateType => {
    switch (action.type) {
        case 'start-waiting':
            return { ...state, isAuth: false, isWaiting: true, isError: false };

        case 'stop-waiting':
            return { ...state, isWaiting: false, ...action.payload };
    }

    return state;
};
