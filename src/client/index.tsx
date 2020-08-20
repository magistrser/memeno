import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import MobilePhoneScreen from './components/MobilePhoneScreen';
import MainPageRouter from './components/MainPageRouter';
import Memeno from './pages/Memes';

// eslint-disable-next-line
// @ts-ignore
import configureStore from 'ConfigureStoreWebpackResolved';
import routes from '../routes/routes';

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <MobilePhoneScreen>
            <MainPageRouter
                rootPath={routes.root}
                loginPath={routes.login}
                loginNoFailPath={routes.react.login.noFail}
                loginServerErrorResponse={
                    routes.react.login.serverErrorResponse
                }
            >
                <Memeno />
            </MainPageRouter>
        </MobilePhoneScreen>
    </Provider>,
    document.getElementById('root')
);
