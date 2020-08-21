import React, { useState } from 'react';
import './index.css';
import InputLine from '../../components/development/InputLine';
import DevelopmentProvider from '../../../providers/DevelopmentProvider';
import { AuthType } from '../../../server/db/IQueries/IUsersQueries/IUsersBaseQueries/AuthType';
import { AccessLevel } from '../../../server/db/IQueries/IUsersQueries/IUsersBaseQueries/AccessLevel';

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

    const [userIdGetUser, setUserIdGetUser] = useState(0);
    const getValuesForGetUser = () => [
        {
            label: 'User ID',
            onChange: setUserIdGetUser,
            value: userIdGetUser,
        },
    ];

    const [tagsRateTags, setTagsRateTags] = useState('ex;mem');
    const [userIdRateTags, setUserIdRateTags] = useState(0);
    const [likeRateTags, setLikeRateTags] = useState(0);
    const getValuesForRateTags = () => [
        {
            label: 'User ID',
            onChange: setUserIdRateTags,
            value: userIdRateTags,
        },
        {
            label: `Tags(Split ';')`,
            onChange: setTagsRateTags,
            value: tagsRateTags,
        },
        {
            label: 'Rating(0/1)',
            onChange: setLikeRateTags,
            value: likeRateTags,
        },
    ];

    const [accessLevelSetAccessLevel, setAccessLeveSetAccessLevel] = useState(
        'common'
    );
    const [userIdSetAccessLevel, setUserIdSetAccessLevel] = useState(0);
    const getValuesForSetAccessLevel = () => [
        {
            label: 'User ID',
            onChange: setUserIdSetAccessLevel,
            value: userIdSetAccessLevel,
        },
        {
            label: 'Access level',
            onChange: setAccessLeveSetAccessLevel,
            value: accessLevelSetAccessLevel,
        },
    ];

    const [userIdGetAccessLevel, setUserIdGetAccessLevel] = useState(0);
    const getValuesForGetAccessLevel = () => [
        {
            label: 'User ID',
            onChange: setUserIdGetAccessLevel,
            value: userIdGetAccessLevel,
        },
    ];

    return (
        <div className="users-controller">
            <InputLine
                label="Set Access level"
                onEnter={() => {
                    DevelopmentProvider.users
                        .createNewUser({ auth_type: AuthType[authType] })
                        .then((res) => {
                            props.setOutput(res);
                        })
                        .catch(props.setOutput);
                }}
                values={getValuesForCreateUser()}
            />
            <InputLine
                label="Get User"
                onEnter={() => {
                    DevelopmentProvider.users
                        .getUser({ user_id: userIdGetUser })
                        .then((res) => {
                            props.setOutput(res);
                        })
                        .catch(props.setOutput);
                }}
                values={getValuesForGetUser()}
            />
            <InputLine
                label="Rate User Tags"
                onEnter={() => {
                    DevelopmentProvider.users
                        .rateTags({
                            user_id: userIdRateTags,
                            tags: tagsRateTags.split(';'),
                            like: likeRateTags === 1,
                        })
                        .then((res) => {
                            props.setOutput(res);
                        })
                        .catch(props.setOutput);
                }}
                values={getValuesForRateTags()}
            />
            <InputLine
                label="Set Access Level"
                onEnter={() => {
                    DevelopmentProvider.users
                        .setAccessLevel({
                            user_id: userIdSetAccessLevel,
                            access_level: accessLevelSetAccessLevel as AccessLevel,
                        })
                        .then((res) => {
                            props.setOutput(res);
                        })
                        .catch(props.setOutput);
                }}
                values={getValuesForSetAccessLevel()}
            />
            <InputLine
                label="Get Access Level"
                onEnter={() => {
                    DevelopmentProvider.users
                        .getAccessLevel({
                            user_id: userIdGetAccessLevel,
                        })
                        .then((res) => {
                            props.setOutput(res);
                        })
                        .catch(props.setOutput);
                }}
                values={getValuesForGetAccessLevel()}
            />
        </div>
    );
};

export default Index;
