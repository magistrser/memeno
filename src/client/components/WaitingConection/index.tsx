import React from 'react';
import Waiting from '../Waiting';
import './index.css';

const Index: React.FC = () => {
    return (
        <div className="waiting-connection-main">
            <div className="waiting-connection-hide"></div>
            <div className="waiting-connection-message">
                <Waiting message="Connecting..." />
            </div>
        </div>
    );
};

export default Index;
