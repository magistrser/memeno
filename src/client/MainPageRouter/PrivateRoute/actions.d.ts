type SetAuthAction = {
    type: 'set-auth';
    payload: {
        isAuth: boolean;
    };
};

export type Action = SetAuthAction;
