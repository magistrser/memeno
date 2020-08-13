import React, { useEffect, useReducer } from 'react';
import { Route, Redirect } from 'react-router-dom';
import reducer, { initState } from './reducer';
import axios from 'axios';
import config from '../../../config';

interface IsAuth {
    isAuth: boolean;
}

const Index = ({ children, ...rest }) => {
    const [state, dispatch] = useReducer(reducer, initState);
    useEffect(() => {
        axios
            .get<IsAuth>(`http://${config.server.address}/auth/is-auth`)
            .then((res) => {
                dispatch({
                    type: 'set-auth',
                    payload: {
                        isAuth: res.data.isAuth,
                    },
                });
            });
    }, []);

    return (
        <Route
            {...rest}
            isAuth
            render={({ location }) =>
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
