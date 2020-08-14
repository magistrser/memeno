export type StartWaitingAction = {
    type: 'start-waiting';
};

export type StopWaitingAction = {
    type: 'stop-waiting';
    payload: {
        isAuth: boolean;
        isError: boolean;
    };
};

export type Action = StartWaitingAction | StopWaitingAction;
