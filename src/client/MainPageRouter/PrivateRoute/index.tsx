import React, { useEffect, useReducer, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import reducer, { initState } from './reducer';
import axios from 'axios';
import './index.css';

import routes from '../../../routes';

interface IsAuth {
    isAuth: boolean;
}

const Index = ({ children, ...rest }) => {
    const [state, dispatch] = useReducer(reducer, initState);
    useEffect(() => {
        dispatch({ type: 'start-waiting' });
        axios.get<IsAuth>(routes.server.auth.isAuth).then((res) => {
            dispatch({
                type: 'stop-waiting',
                payload: {
                    isAuth: res.data.isAuth,
                },
            });
        });
    }, []);

    return (
        <Route
            {...rest}
            render={({ location }) =>
                state.isWaiting && !state.isAuth ?
                    <div className='waiting'>memeno</div>
                       :
                state.isAuth ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: location },
                        }}
                    />
                )
            }
        />
    );
};

export default Index;
