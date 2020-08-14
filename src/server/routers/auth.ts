import express from 'express';
import passport from 'passport';

import { IsAuth } from '../../api/responses';
import {IGetUserAuthInfoRequest} from "../../api/requests";
import routes from '../../routes';

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

router.get(routes.server.auth.isAuth, (req: IGetUserAuthInfoRequest, res) => {
    const isAuth = req.isAuthenticated();
    const result: IsAuth = {
        isAuth,
    };
    res.json(result);
});

export default router;
