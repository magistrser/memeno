import React, { useEffect, useState } from 'react';
import DevMenu from '../../components/development/DevMenu';
import routes from '../../../routes/routes';
import './index.less';
import { MenuCategory } from '../../../routes/development/MenuCategory';
import { useParams } from 'react-router-dom';
import UsersController from '../UsersController';
import DevController from '../DevController';
import MemesController from '../MemesController';
import ResponseOutput from '../../components/development/ResponseOutput';
import DevelopmentProvider from '../../../providers/DevelopmentProvider';
import developmentConnectionTracker from '../developmentConnectionTracker';

const Index: React.FC = () => {
    const { menu } = useParams() as { menu: MenuCategory };
    const getButtons = () => [
        {
            path: routes.react.development.main.users,
            label: 'Users',
            isSelected:
                menu === MenuCategory.Users ||
                menu === MenuCategory.NotSelected,
        },
        {
            path: routes.react.development.main.memes,
            label: 'Memes',
            isSelected: menu === MenuCategory.Memes,
        },
        {
            path: routes.react.development.main.dev,
            label: 'Dev',
            isSelected: menu === MenuCategory.Dev,
        },
    ];

    const [output, setOutput] = useState('');
    const setOutputWrapper = (value: any) => {
        if (typeof value === 'string') {
            setOutput(value);
            return;
        }
        setOutput(JSON.stringify(value, null, '\t'));
    };

    const handleError = (data?: any) => {
        const error = {
            status: data.response.status,
            description: data.response.data,
        };
        setOutputWrapper(`Error:\n${JSON.stringify(error, null, '\t')}`);
    };
    developmentConnectionTracker.setServerInternalErrorHandle(handleError);
    developmentConnectionTracker.setUnknownErrorHandle(handleError);

    const [yourId, setYourId] = useState<number | null>(null);
    useEffect(() => {
        DevelopmentProvider.dev
            .getMyId()
            .then((userId) => {
                setYourId(userId);
            })
            .catch
            // todo
            ();
    }, []);

    const getCurrentContent = (menu) => {
        let usersStyle = { display: 'none' };
        let memesStyle = { display: 'none' };
        let devStyle = { display: 'none' };

        switch (menu) {
            case MenuCategory.NotSelected:
            case MenuCategory.Users:
                usersStyle = { display: 'block' };
                break;
            case MenuCategory.Memes:
                memesStyle = { display: 'block' };
                break;
            case MenuCategory.Dev:
                devStyle = { display: 'block' };
                break;
        }

        return (
            <>
                <div style={usersStyle}>
                    <UsersController setOutput={setOutputWrapper} />
                </div>
                <div style={devStyle}>
                    <DevController setOutput={setOutputWrapper} />
                </div>
                <div style={memesStyle}>
                    <MemesController setOutput={setOutputWrapper} />
                </div>
            </>
        );
    };

    return (
        <div className="main">
            <div className="buttons">
                <DevMenu buttons={getButtons()} userId={yourId} />
            </div>
            <div className="controls">
                <div className="userController">{getCurrentContent(menu)}</div>
            </div>
            <div className="output">
                <ResponseOutput output={output} />
            </div>
        </div>
    );
};

export default Index;
