import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AuthRoute from '../AuthRoute';
import Login from '../Login';

type Props = {
    loginPath: string;
    rootPath: string;
    loginNoFailPath: string;
    loginServerErrorResponse: string;
};

const Index: React.FC<Props> = (props) => {
    return (
        <Router>
            <Switch>
                <Login path={props.loginPath} />
                <AuthRoute
                    path={props.rootPath}
                    authPath={props.loginNoFailPath}
                    errorPath={props.loginServerErrorResponse}
                >
                    <Route path={props.rootPath}>{props.children}</Route>
                </AuthRoute>
            </Switch>
        </Router>
    );
};

export default Index;
