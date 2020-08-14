import React, { useEffect, useReducer } from 'react';
import { Route, Redirect } from 'react-router-dom';
import reducer, { initState } from './reducer';
import axios from 'axios';
import './index.css';

import * as Action from './actionUtils';
import { IsAuth } from '../../../api/responses';
import routes from '../../../routes';

const Index = ({ children, ...rest }) => {
    const [state, dispatch] = useReducer(reducer, initState);
    useEffect(() => {
        dispatch(Action.createStartWaitingAction());
        axios
            .get<IsAuth>(routes.server.auth.isAuth)
            .then((res) => {
                dispatch(
                    Action.createStopWaitingAction({
                        isAuth: res.data.isAuth,
                        isError: false,
                    })
                );
            })
            .catch(() => {
                dispatch(
                    Action.createStopWaitingAction({
                        isAuth: false,
                        isError: true,
                    })
                );
            });
    }, []);

    return (
        <Route
            {...rest}
            render={({ location }) =>
                state.isWaiting && !state.isAuth ? (
                    <div className="waiting">memeno</div>
                ) : state.isAuth ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: state.isError
                                ? routes.react.login.serverErrorResponse
                                : routes.react.login.noFail,
                            state: { from: location },
                        }}
                    />
                )
            }
        />
    );
};

export default Index;
