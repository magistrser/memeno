import { Action } from './actions';

type StateType = {
    isAuth: boolean;
};

export const initState: StateType = {
    isAuth: false,
};

export default (state: StateType, action: Action): StateType => {
    switch (action.type) {
        case 'set-auth':
            return { ...state, ...action.payload };
    }
};
