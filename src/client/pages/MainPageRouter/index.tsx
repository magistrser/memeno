import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import routes from '../../../routes';

import AuthRoute from '../../components/AuthRoute';
import Memeno from '../Memes';
import Login from '../Login';

const Index: React.FC = () => {
    return (
        <Router>
            <Switch>
                <Route path={routes.login}>
                    <Login />
                </Route>
                <AuthRoute
                    path={routes.root}
                    authPath={routes.react.login.noFail}
                    errorPath={routes.react.login.serverErrorResponse}
                >
                    <Route path={routes.root}>
                        <Memeno />
                    </Route>
                </AuthRoute>
            </Switch>
        </Router>
    );
};

export default Index;
