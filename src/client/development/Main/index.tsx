import React, { useState } from 'react';
import DevMenu from '../../components/development/DevMenu';
import routes from '../../../routes/routes';
import './index.less';
import { MenuCategory } from '../../../routes/development/MenuCategory';
import { useParams } from 'react-router-dom';
import UsersController from '../UsersController';
import ResponseOutput from '../../components/development/ResponseOutput';

const Index: React.FC = () => {
    const { menu } = useParams() as { menu: MenuCategory };
    const getButtons = () => [
        {
            path: routes.react.development.main.users,
            label: 'Users',
            isSelected: menu === MenuCategory.Users,
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
    const setOutputWrapper = (value: any) =>
        setOutput(JSON.stringify(value, null, '\t'));

    const getCurrentContent = (menu) => {
        let usersStyle = { display: 'none' };
        let memesStyle = { display: 'none' };
        let devStyle = { display: 'none' };

        switch (menu) {
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
            <div style={usersStyle}>
                <UsersController setOutput={setOutputWrapper} />
            </div>
        );
    };

    return (
        <div className="main">
            <div className="buttons">
                <DevMenu buttons={getButtons()} />
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
