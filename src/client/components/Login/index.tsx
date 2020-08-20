import React from 'react';
import { useParams } from 'react-router-dom';
import { Route } from 'react-router-dom';
import './index.css';

import { LoginResult } from '../../../routes/LoginResult';

import Vk from '../../components/Vk';

type Props = {
    path: string;
};

const Index: React.FC<Props> = (props) => {
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
        <Route path={props.path}>
            <div className="login">
                {getFailMessage()}
                <Vk />
            </div>
        </Route>
    );
};

export default Index;
