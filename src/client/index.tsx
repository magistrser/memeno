import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import './index.css';
import MobilePhoneScreen from './components/MobilePhoneScreen';
import MainPageRouter from './pages/MainPageRouter';

// @ts-ignore
import configureStore from 'ConfigureStoreWebpackResolved';

const store = configureStore()

ReactDOM.render(
    <Provider store={store}>
        <MobilePhoneScreen>
            <MainPageRouter />
        </MobilePhoneScreen>
    </Provider>,
    document.getElementById('root')
);
