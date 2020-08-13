import React from 'react';
import './index.css';
import routes from '../../../../../routes';

const Index: React.FC = (props) => {
    return (
        <a className="vk-auth" href={routes.server.auth.vk.login}>
            <div className="button-content"></div>
            <div className="button-content-login"></div>
        </a>
    );
};

export default Index;
