import express from 'express';
import passport from 'passport';

import routes from '../../routes/routes';
import { Auth } from '../../routes/auth';
import { IGetUserAuthInfoRequest } from '../types';

const router = express.Router();

router.get(routes.server.auth.vk.login, passport.authenticate('vkontakte'));
router.get(
    routes.server.auth.vk.callback,
    passport.authenticate('vkontakte', {
        failureRedirect: routes.server.auth.fail,
    }),
    (req, res) => res.redirect(routes.server.auth.success)
);

router.get(routes.server.auth.success, (req, res) => {
    res.redirect(routes.react.root);
});
router.get(routes.server.auth.fail, (req, res) => {
    res.redirect(routes.react.login.fail);
});

router[Auth.IsAuth.Type](
    Auth.IsAuth.Route,
    (req: IGetUserAuthInfoRequest, res) => {
        const isAuth: Auth.IsAuth.Res = req.isAuthenticated();
        res.json(isAuth);
    }
);

export default router;
