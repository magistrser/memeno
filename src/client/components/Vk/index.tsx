import React from 'react';
import './index.css';

type Props = {
    serverLoginPath;
};

const Index: React.FC<Props> = (props) => {
    return (
        <a className="vk-auth" href={props.serverLoginPath}>
            <div className="button-content"></div>
            <div className="button-content-login"></div>
        </a>
    );
};

export default Index;
