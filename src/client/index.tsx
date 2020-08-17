import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import './index.css';
import MobilePhoneScreen from './MobilePhoneScreen';
import MainPageRouter from './MainPageRouter';

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
