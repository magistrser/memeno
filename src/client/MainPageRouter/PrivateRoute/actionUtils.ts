import { StartWaitingAction, StopWaitingAction } from './actions';

export const createStartWaitingAction: () => StartWaitingAction = () => {
    return {
        type: 'start-waiting',
    };
};

export const createStopWaitingAction: (payload) => StopWaitingAction = (
    payload
) => {
    return {
        type: 'stop-waiting',
        payload,
    };
};
