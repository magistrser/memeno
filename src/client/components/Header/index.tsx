import React from 'react';
import './index.css';

const Index: React.FC = (props) => {
    return <div className="header-component">{props.children}</div>;
};

export default Index;
