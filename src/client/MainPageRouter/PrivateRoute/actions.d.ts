type StartWaitingAction = {
    type: 'start-waiting';
};

type StopWaitingAction = {
    type: 'stop-waiting';
    payload: {
        isAuth: boolean;
        isError: boolean;
    };
};

export type Action = StartWaitingAction | StopWaitingAction;
