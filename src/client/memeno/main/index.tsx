import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { useHistory, Route } from 'react-router-dom';
import './index.css';
import MobilePhoneScreen from '../../components/MobilePhoneScreen';
import MainPageRouter from '../../components/MainPageRouter';
import WaitingConnectionWrapper from '../../components/WaitingConnectionWrapper';
import Memes from '../pages/Memes';
import Error from '../pages/Error';
import routes from '../../../routes/routes';
import connectionTracker from '../../utils/ConnectionTracker';

// eslint-disable-next-line
// @ts-ignore
import configureStore from 'ConfigureStoreWebpackResolved';
const store = configureStore();

const WorkPages: React.FC = () => {
    const history = useHistory();
    connectionTracker.setAuthLostHandle(() => {
        const from = { pathname: routes.react.login.noFail };
        history.replace(from);
    });

    const [errorMessage, setErrorMessage] = useState('');
    const handleError = (error?: any) => {
        setErrorMessage(JSON.stringify(error));
        const from = { pathname: routes.error };
        history.replace(from);
    };
    connectionTracker.setServerInternalErrorHandle(handleError);
    connectionTracker.setUnknownErrorHandle(handleError);

    return (
        <>
            <Route path={routes.memes}>
                <Memes />
            </Route>
            <Route path={routes.error}>
                <Error errorMessage={errorMessage} returnPath={routes.memes} />
            </Route>
        </>
    );
};

const Index: React.FC = () => {
    const [isWaitingConnection, setWaitingConnection] = useState(false);
    connectionTracker.setConnectionLostHandel(() => setWaitingConnection(true));
    connectionTracker.setConnectionRestoreHandle(() =>
        setWaitingConnection(false)
    );

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
                        contentPath={routes.memes}
                        loginPath={routes.login}
                        loginNoFailPath={routes.react.login.noFail}
                        loginServerErrorResponse={
                            routes.react.login.serverErrorResponse
                        }
                        serverLoginPath={routes.server.auth.vk.login}
                    >
                        <WorkPages />
                    </MainPageRouter>
                </WaitingConnectionWrapper>
            </MobilePhoneScreen>
        </Provider>
    );
};

export default Index;
