import React from 'react';
import '../common/button.css';
import './index.less';

interface IDislikeButton {
    onClick: () => void;
}

const Index: React.FC<IDislikeButton> = (props) => {
    return <button className="dislike-button" onClick={props.onClick} />;
};

export default Index;
