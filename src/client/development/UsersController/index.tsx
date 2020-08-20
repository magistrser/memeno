import React, { useState } from 'react';
import './index.css';
import InputLine from '../../components/development/InputLine';
import DevelopmentProvider from '../../../providers/DevelopmentProvider';
import { AuthType } from '../../../server/db/IQueries/IUsersQueries/IUsersBaseQueries/AuthType';

interface Props {
    setOutput: (output: any) => void;
}

const Index: React.FC<Props> = (props) => {
    const [authType, setAuthType] = useState('vk');

    const getValuesForCreateUser = () => [
        {
            label: 'AuthType',
            onChange: setAuthType,
            value: authType,
        },
    ];

    return (
        <div className="users-controller">
            <InputLine
                label="Create User"
                onEnter={() => {
                    DevelopmentProvider.users
                        .createNewUser({ auth_type: AuthType[authType] })
                        .then((res) => {
                            props.setOutput(res);
                        });
                }}
                values={getValuesForCreateUser()}
            />
        </div>
    );
};

export default Index;
