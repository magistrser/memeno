import React, { useState } from 'react';
import InputLine from '../../components/development/InputLine';
import DevelopmentProvider from '../../../providers/DevelopmentProvider';
import { AuthType } from '../../../server/db/IQueries/IUsersQueries/IUsersBaseQueries/AuthType';
import { AccessLevel } from '../../../server/db/IQueries/IUsersQueries/IUsersBaseQueries/AccessLevel';
import developmentConnectionTracker from '../developmentConnectionTracker';

interface Props {
    setOutput: (output: any) => void;
}

const Index: React.FC<Props> = (props) => {
    const [
        userIdDropUserWatchedMemes,
        setUserIdDropUserWatchedMemes,
    ] = useState(0);
    const getValuesForDropUserWatchedMemes = () => [
        {
            label: 'User ID',
            onChange: setUserIdDropUserWatchedMemes,
            value: userIdDropUserWatchedMemes,
        },
    ];

    const [userIdSetUserUserRating, setUserIdSetUserUserRating] = useState(0);
    const [
        secondUserIdSetUserUserRating,
        setSecondUserIdSetUserUserRating,
    ] = useState(0);
    const [ratingSetUserUserRating, setRatingSetUserUserRating] = useState(0);
    const getValuesForSetUserUserRating = () => [
        {
            label: 'User ID',
            onChange: setUserIdSetUserUserRating,
            value: userIdSetUserUserRating,
        },
        {
            label: 'Second User ID',
            onChange: setSecondUserIdSetUserUserRating,
            value: secondUserIdSetUserUserRating,
        },
        {
            label: 'Rating',
            onChange: setRatingSetUserUserRating,
            value: ratingSetUserUserRating,
        },
    ];

    const [userIdDropUserUsersRating, setUserIdDropUserUsersRating] = useState(
        0
    );
    const getValuesForDropUserUsersRating = () => [
        {
            label: 'User ID',
            onChange: setUserIdDropUserUsersRating,
            value: userIdDropUserUsersRating,
        },
    ];

    const [userIdSetUserTagRating, setUserIdSetUserTagRating] = useState(0);
    const [tagSetUserTagRating, setTagSetUserTagRating] = useState('ex');
    const [ratingSetUserTagRating, setRatingSetUserTagRating] = useState(0);
    const getValuesForSetUserTagRating = () => [
        {
            label: 'User ID',
            onChange: setUserIdSetUserTagRating,
            value: userIdSetUserTagRating,
        },
        {
            label: 'Tag',
            onChange: setTagSetUserTagRating,
            value: tagSetUserTagRating,
        },
        {
            label: 'Rating',
            onChange: setRatingSetUserTagRating,
            value: ratingSetUserTagRating,
        },
    ];

    const [userIdDropUserTagsRating, setUserIdDropUserTagsRating] = useState(0);
    const getValuesForDropUserTagsRating = () => [
        {
            label: 'User ID',
            onChange: setUserIdDropUserTagsRating,
            value: userIdDropUserTagsRating,
        },
    ];

    const [memIdSetMemRating, setMemIdSetMemRating] = useState(0);
    const [ratingSetMemRating, setRatingSetMemRating] = useState(0);
    const getValuesForSetMemRating = () => [
        {
            label: 'Mem ID',
            onChange: setMemIdSetMemRating,
            value: memIdSetMemRating,
        },
        {
            label: 'Rating',
            onChange: setRatingSetMemRating,
            value: ratingSetMemRating,
        },
    ];

    const [userIdSetUserRating, setUserIdSetUserRating] = useState(0);
    const [ratingSetUserRating, setRatingSetUserRating] = useState(0);
    const getValuesForSetUserRating = () => [
        {
            label: 'User ID',
            onChange: setUserIdSetUserRating,
            value: userIdSetUserRating,
        },
        {
            label: 'Rating',
            onChange: setRatingSetUserRating,
            value: ratingSetUserRating,
        },
    ];

    return (
        <div className="dev-controller">
            <InputLine
                label="Drop user watched memes"
                onEnter={() => {
                    developmentConnectionTracker
                        .makeRequest(() =>
                            DevelopmentProvider.dev.dropUserWatchedMemes({
                                user_id: userIdDropUserWatchedMemes,
                            })
                        )
                        .then((res) => {
                            props.setOutput(res);
                        })
                        .catch(props.setOutput);
                }}
                values={getValuesForDropUserWatchedMemes()}
            />
            <InputLine
                label="Set user-user rating"
                onEnter={() => {
                    developmentConnectionTracker
                        .makeRequest(() =>
                            DevelopmentProvider.dev.setUserUserRating({
                                user_id: userIdSetUserUserRating,
                                second_user_id: secondUserIdSetUserUserRating,
                                rating: ratingSetUserUserRating,
                            })
                        )
                        .then((res) => {
                            props.setOutput(res);
                        })
                        .catch(props.setOutput);
                }}
                values={getValuesForSetUserUserRating()}
            />
            <InputLine
                label="Drop user users rating"
                onEnter={() => {
                    developmentConnectionTracker
                        .makeRequest(() =>
                            DevelopmentProvider.dev.dropUserUsersRating({
                                user_id: userIdDropUserUsersRating,
                            })
                        )
                        .then((res) => {
                            props.setOutput(res);
                        })
                        .catch(props.setOutput);
                }}
                values={getValuesForDropUserUsersRating()}
            />
            <InputLine
                label="Set user tag rating"
                onEnter={() => {
                    developmentConnectionTracker
                        .makeRequest(() =>
                            DevelopmentProvider.dev.setUserTagRating({
                                user_id: userIdSetUserTagRating,
                                tag: tagSetUserTagRating,
                                rating: ratingSetUserTagRating,
                            })
                        )
                        .then((res) => {
                            props.setOutput(res);
                        })
                        .catch(props.setOutput);
                }}
                values={getValuesForSetUserTagRating()}
            />
            <InputLine
                label="Drop user tags rating"
                onEnter={() => {
                    developmentConnectionTracker
                        .makeRequest(() =>
                            DevelopmentProvider.dev.dropUserTagsRating({
                                user_id: userIdDropUserTagsRating,
                            })
                        )
                        .then((res) => {
                            props.setOutput(res);
                        })
                        .catch(props.setOutput);
                }}
                values={getValuesForDropUserTagsRating()}
            />
            <InputLine
                label="Set mem rating"
                onEnter={() => {
                    developmentConnectionTracker
                        .makeRequest(() =>
                            DevelopmentProvider.dev.setMemRating({
                                mem_id: memIdSetMemRating,
                                rating: ratingSetMemRating,
                            })
                        )
                        .then((res) => {
                            props.setOutput(res);
                        })
                        .catch(props.setOutput);
                }}
                values={getValuesForSetMemRating()}
            />
            <InputLine
                label="Set user rating"
                onEnter={() => {
                    developmentConnectionTracker
                        .makeRequest(() =>
                            DevelopmentProvider.dev.setUserRating({
                                user_id: userIdSetUserRating,
                                rating: ratingSetUserRating,
                            })
                        )
                        .then((res) => {
                            props.setOutput(res);
                        })
                        .catch(props.setOutput);
                }}
                values={getValuesForSetUserRating()}
            />
            <InputLine
                label="Clean DB"
                onEnter={() => {
                    developmentConnectionTracker
                        .makeRequest(() => DevelopmentProvider.dev.cleanDb())
                        .then((res) => {
                            props.setOutput(res);
                        })
                        .catch(props.setOutput);
                }}
                values={[]}
            />
        </div>
    );
};

export default Index;
