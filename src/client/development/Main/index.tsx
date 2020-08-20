import React, {useState} from 'react';
import DevMenu from '../../components/development/DevMenu';
import routes from '../../../routes/routes';
import './index.less';
import { MenuCategory } from '../../../routes/development/MenuCategory';
import { useParams } from 'react-router-dom';
import UsersController from '../UsersController';
import ResponseOutput from '../../components/development/ResponseOutput'

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

    const [output, setOutput] = useState("");
    const setOutputWrapper = (value: any) => setOutput(JSON.stringify(value));


    return (
        <div className="main">
            <div className="buttons">
                <DevMenu buttons={getButtons()} />
            </div>
            <div className="controls">
                <UsersController setOutput={setOutputWrapper} />
            </div>
            <div className="output">
                <ResponseOutput output={output}/>
            </div>
        </div>
    );
};

export default Index;
