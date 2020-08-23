import React from 'react';
import './index.css';

interface Props {
    message: string;
}

const Index: React.FC<Props> = (props) => {
    return <div className="waiting">{props.message}</div>;
};

export default Index;
