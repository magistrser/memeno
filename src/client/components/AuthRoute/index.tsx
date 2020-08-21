import React, { useEffect, useState } from 'react';
import { Route, useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';

import Waiting from '../Waiting';
import { Auth } from '../../../routes/auth';

const Index = ({ children, loginPath, contentPath, errorPath, ...rest }) => {
    const [isAuth, setAuth] = useState(false);

    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        setAuth(false);
        axios[Auth.IsAuth.Type]<Auth.IsAuth.Res>(Auth.IsAuth.Route)
            .then((res) => {
                const { from } =
                    location.state || res.data == true
                        ? { from: { pathname: contentPath } }
                        : { from: { pathname: loginPath } };

                setAuth(res.data);
                history.replace(from);
            })
            .catch(() => {
                const { from } = location.state || {
                    from: { pathname: errorPath },
                };

                setAuth(false);
                history.replace(from);
            });
    }, []);

    return (
        <Route {...rest} render={() => (!isAuth ? <Waiting /> : children)} />
    );
};

export default Index;
