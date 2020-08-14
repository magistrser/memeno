import React from 'react';
import { useParams } from 'react-router-dom';
import './index.css';

import { LoginResult } from '../../../routes/LoginResult';

import Vk from '../../components/Vk';

const Index: React.FC = () => {
    const getFailMessage = () => {
        const { fail } = useParams() as { fail: LoginResult };
        if (fail == LoginResult.fail) {
            return <div className="error">Failed, try letter.</div>;
        }
        if (fail == LoginResult.serverErrorResponse) {
            return <div className="error">Server error, try letter.</div>;
        }

        return <></>;
    };

    return (
        <div className="login">
            {getFailMessage()}
            <Vk />
        </div>
    );
};

export default Index;
