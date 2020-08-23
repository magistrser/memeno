import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import MainPageRouter from '../../components/MainPageRouter';
import routes from '../../../routes/routes';
import DevPage from '../pages/DevPage';
import developmentConnectionTracker from '../developmentConnectionTracker';
import WaitingConnectionWrapper from '../../components/WaitingConnectionWrapper';

const Index: React.FC = () => {
    const [isWaitingConnection, setWaitingConnection] = useState(false);
    developmentConnectionTracker.setConnectionLostHandel(() =>
        setWaitingConnection(true)
    );
    developmentConnectionTracker.setConnectionRestoreHandle(() =>
        setWaitingConnection(false)
    );

    return (
        <div className="development">
            <WaitingConnectionWrapper
                isWaitingConnection={isWaitingConnection}
                waitingChildren={
                    <div style={{ color: 'black' }}>Connecting</div>
                }
            >
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
                    <Route path={routes.development.main}>
                        <DevPage />
                    </Route>
                </MainPageRouter>
            </WaitingConnectionWrapper>
        </div>
    );
};

export default Index;
