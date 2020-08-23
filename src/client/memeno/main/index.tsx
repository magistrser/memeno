import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './index.css';
import MobilePhoneScreen from '../../components/MobilePhoneScreen';
import MainPageRouter from '../../components/MainPageRouter';
import WaitingConnectionWrapper from '../../components/WaitingConnectionWrapper';
import Memeno from '../pages/Memes';
import routes from '../../../routes/routes';
import connectionTracker from '../../utils/ConnectionTracker';

// eslint-disable-next-line
// @ts-ignore
import configureStore from 'ConfigureStoreWebpackResolved';

const store = configureStore();

const Index: React.FC = () => {
    const [isWaitingConnection, setWaitingConnection] = useState(false);
    connectionTracker.setConnectionLostHandel(() => setWaitingConnection(true));
    connectionTracker.setConnectionRestoreHandle(() =>
        setWaitingConnection(false)
    );
    connectionTracker.setAuthLostHandle(() => {
        const history = useHistory();
        const from = { pathname: routes.react.login.noFail };
        history.replace(from);
    });

    return (
        <Provider store={store}>
            <MobilePhoneScreen>
                <WaitingConnectionWrapper
                    isWaitingConnection={isWaitingConnection}
                    waitingChildren={
                        <div style={{ color: '#ffed2b' }}>Connecting</div>
                    }
                >
                    <MainPageRouter
                        authPath={routes.root}
                        contentPath={routes.root}
                        loginPath={routes.login}
                        loginNoFailPath={routes.react.login.noFail}
                        loginServerErrorResponse={
                            routes.react.login.serverErrorResponse
                        }
                        serverLoginPath={routes.server.auth.vk.login}
                    >
                        <Memeno />
                    </MainPageRouter>
                </WaitingConnectionWrapper>
            </MobilePhoneScreen>
        </Provider>
    );
};

export default Index;
