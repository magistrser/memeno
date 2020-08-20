import ReactDOM from 'react-dom';
import * as React from 'react';
import './index.css';
import routes from '../../routes/routes';
import MainPageRouter from '../components/MainPageRouter';
import DevMenu from '../components/development/DevMenu';

const buttons = [
    {
        path: 'test1',
        label: 'Test1',
        isSelected: true
    },
    {
        path: 'test2',
        label: 'Test2',
        isSelected: false
    }
]

ReactDOM.render(
    <div className="development">
        <MainPageRouter
            rootPath={routes.react.development.root}
            loginPath={routes.react.development.login.noFail}
            loginNoFailPath={routes.react.development.login.noFail}
            loginServerErrorResponse={
                routes.react.development.login.serverErrorResponse
            }
            serverLoginPath={routes.server.development.auth.vk.login}
        >
            <div className="main">
                <div className="buttons">
                    <DevMenu buttons={buttons}/>
                </div>
                <div className="controls"></div>
            </div>
        </MainPageRouter>
    </div>,
    document.getElementById('root')
);
