import React from 'react';
import { Provider } from 'react-redux';
import './index.css';
import MobilePhoneScreen from '../../components/MobilePhoneScreen';
import MainPageRouter from '../../components/MainPageRouter';
import WaitingConnectionWrapper from '../../components/WaitingConnectionWrapper';
import Memeno from '../pages/Memes';

// eslint-disable-next-line
// @ts-ignore
import configureStore from 'ConfigureStoreWebpackResolved';
import routes from '../../../routes/routes';

const store = configureStore();

const Index: React.FC = () => {
    return (
        <Provider store={store}>
            <MobilePhoneScreen>
                <WaitingConnectionWrapper isWaitingConnection={true}>
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
