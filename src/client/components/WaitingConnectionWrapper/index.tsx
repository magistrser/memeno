import React from 'react';
import Waiting from '../Waiting';
import './index.css';

interface Props {
    isWaitingConnection: boolean;
}

const Index: React.FC<Props> = (props) => {
    return (
        <div className="waiting-connection-wrapper">
            {props.isWaitingConnection ? (
                <>
                    <div className="waiting-connection-hide"></div>
                    <div className="waiting-connection-message">
                        <Waiting message="Connecting..." />
                    </div>
                </>
            ) : null}
            {props.children}
        </div>
    );
};

export default Index;
