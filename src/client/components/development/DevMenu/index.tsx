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
    userId: number | null;
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
            <li id="free-space">
                {props.userId ? `Your ID: ${props.userId}` : null}
            </li>
        </ul>
    );
};

export default Index;
