import express from 'express';
import passport from 'passport';

import routes from '../../routes/routes';
import { Auth } from '../../routes/auth';
import { IGetUserAuthInfoRequest } from '../types';
import safeRoute from '../utils/safeRoute';

const router = express.Router();

router.get(
    routes.server.auth.vk.login,
    passport.authenticate('vkontakte', {
        display: 'mobile',
    })
);

router.get(
    routes.server.development.auth.vk.login,
    passport.authenticate('vkontakte', {
        state: 'development',
    })
);

router.get(
    routes.server.auth.vk.callback,
    passport.authenticate('vkontakte', {
        failureRedirect: routes.server.auth.fail,
    }),
    (req, res) => {
        const redirect =
            req.query.state === 'development'
                ? routes.server.development.auth.success
                : routes.server.auth.success;
        res.redirect(redirect);
    }
);

router.get(routes.server.auth.success, (req, res) => {
    res.redirect(routes.react.root);
});
router.get(routes.server.development.auth.success, (req, res) => {
    res.redirect(routes.react.development.main.users);
});
router.get(routes.server.auth.fail, (req, res) => {
    res.redirect(routes.react.login.fail);
});

router[Auth.IsAuth.Type](
    Auth.IsAuth.Route,
    safeRoute(async (req: IGetUserAuthInfoRequest, res) => {
        const isAuth: Auth.IsAuth.Res = req.isAuthenticated();
        res.json(isAuth);
    })
);

export default router;
