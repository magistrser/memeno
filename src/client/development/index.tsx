import ReactDOM from 'react-dom';
import * as React from 'react';
import routes from '../../routes/routes';
import MainPageRouter from '../components/MainPageRouter';
import Main from './Main';

ReactDOM.render(
    <div className="development">
        <MainPageRouter
            authPath={routes.development.root}
            contentPath={routes.development.main}
            loginPath={routes.react.development.login.noFail}
            loginNoFailPath={routes.react.development.login.noFail}
            loginServerErrorResponse={
                routes.react.development.login.serverErrorResponse
            }
            serverLoginPath={routes.server.development.auth.vk.login}
        >
            <Main />
        </MainPageRouter>
    </div>,
    document.getElementById('root')
);
