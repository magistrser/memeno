import { Action } from './actions';

type StateType = {
    isAuth: boolean;
    isWaiting: boolean;
};

export const initState: StateType = {
    isAuth: false,
    isWaiting: true,
};

export default (state: StateType, action: Action): StateType => {
    switch (action.type) {
        case 'start-waiting':
            return {...state, isAuth: false, isWaiting: true}

        case "stop-waiting":
            return { ...state, isWaiting: false, ...action.payload };
    }

    return state;
};
