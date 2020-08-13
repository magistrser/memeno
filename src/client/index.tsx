import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import MobilePhoneScreen from './MobilePhoneScreen';
import MainPageRouter from './MainPageRouter';

ReactDOM.render(
    <React.StrictMode>
        <MobilePhoneScreen>
            <MainPageRouter />
        </MobilePhoneScreen>
    </React.StrictMode>,
    document.getElementById('root')
);
