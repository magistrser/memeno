import React from 'react';
import './index.css';

const Index: React.FC = (props) => {
    return <div className="waiting">{props.children}</div>;
};

export default Index;
