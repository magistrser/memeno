import React from 'react';
import LinkButton from '../LinkButton';
import './index.less';

type Button = {
    path: string;
    label: string;
    isSelected: boolean;
};
interface Props {
    buttons: Button[];
}

const Index: React.FC<Props> = (props) => {
    const getButtons = (buttons: Button[]) =>
        buttons.map((prop) => {
            const id = prop.isSelected ? 'selected-button' : '';
            return (
                <li id={id}>
                    <LinkButton {...prop} />
                </li>
            );
        });

    return (
        <ul className="dev-menu">
            {getButtons(props.buttons)}
            <li id="free-space" />
        </ul>
    );
};

export default Index;
