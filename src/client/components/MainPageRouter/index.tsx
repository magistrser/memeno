import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import AuthRoute from '../AuthRoute';
import Login from '../Login';

type Props = {
    loginPath: string;
    authPath: string;
    contentPath: string;
    loginNoFailPath: string;
    loginServerErrorResponse: string;
    serverLoginPath: string;
};

const Index: React.FC<Props> = (props) => {
    return (
        <Router>
            <Switch>
                <Login
                    path={props.loginPath}
                    serverLoginPath={props.serverLoginPath}
                />
                <AuthRoute
                    path={props.authPath}
                    contentPath={props.contentPath}
                    loginPath={props.loginNoFailPath}
                    errorPath={props.loginServerErrorResponse}
                >
                    {props.children}
                </AuthRoute>
            </Switch>
        </Router>
    );
};

export default Index;
