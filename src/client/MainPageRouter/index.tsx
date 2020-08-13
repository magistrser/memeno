import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import routes from '../../routes';

import PrivateRoute from './PrivateRoute';
import Memeno from './Memeno';
import Login from './Login';

const Index: React.FC = () => {
    return (
        <Router>
            <Switch>
                <Route path={routes.react.login}>
                    <Login />
                </Route>
                <PrivateRoute path={routes.react.root}>
                    <Memeno />
                </PrivateRoute>
            </Switch>
        </Router>
    );
};

export default Index;
