import React from 'react';
import DevMenu from '../../components/development/DevMenu';
import routes from '../../../routes/routes';
import './index.css';
import { MenuCategory } from '../../../routes/development/MenuCategory';
import { useParams } from 'react-router-dom';

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

    return (
        <div className="main">
            <div className="buttons">
                <DevMenu buttons={getButtons()} />
            </div>
            <div className="controls"></div>
        </div>
    );
};

export default Index;
