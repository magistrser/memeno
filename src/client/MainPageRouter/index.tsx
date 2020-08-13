import React from 'react';

import Memeno from './Memeno';
import Login from './Login';

const Index: React.FC = () => {
    const isAuthorized = true;
    return <div>{isAuthorized ? <Memeno /> : <Login />}</div>;
};

export default Index;
