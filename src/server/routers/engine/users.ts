import UsersEngine from '../../engine/postresql/UsersEngine';
import express from 'express';
import { Users } from '../../../routes/engine/users';
import { IGetUserAuthInfoRequest } from '../../types';
import safeRoute from '../../utils/safeRoute';

const router = express.Router();

router[Users.CreateNewUser.Type](
    Users.CreateNewUser.Rout,
    safeRoute(async (req: IGetUserAuthInfoRequest, res) => {
        const createNewUserReq: Users.CreateNewUser.Req = {
            auth_type: req.body.auth_type,
        };

        const user_id: Users.CreateNewUser.Res = await UsersEngine.createNewUser(
            createNewUserReq
        );
        res.json(user_id);
    })
);
router[Users.AddVkUser.Type](
    Users.AddVkUser.Rout,
    safeRoute(async (req: IGetUserAuthInfoRequest, res) => {
        const addVkUserReq: Users.AddVkUser.Req = {
            vk_id: req.body.vk_id,
            email: req.body.email,
            full_name: req.body.full_name,
            photo_url: req.body.photo_url,
            url: req.body.url,
        };

        await UsersEngine.addVkUser(addVkUserReq);
        res.json();
    })
);
router[Users.GetVkUserByUserId.Type](
    Users.GetVkUserByUserId.Rout,
    safeRoute(async (req: IGetUserAuthInfoRequest, res) => {
        const getVkUserByUserIdReq: Users.GetVkUserByUserId.Req = {
            user_id: req.body.user_id,
        };

        const vkUser: Users.GetVkUserByUserId.Res = await UsersEngine.getVkUserByUserId(
            getVkUserByUserIdReq
        );
        res.json(vkUser);
    })
);
router[Users.GetVkUserByVkId.Type](
    Users.GetVkUserByVkId.Rout,
    safeRoute(async (req: IGetUserAuthInfoRequest, res) => {
        const getVkUserByVkIdReq: Users.GetVkUserByVkId.Req = {
            vk_id: req.body.vk_id,
        };

        const vkUser: Users.GetVkUserByVkId.Res = await UsersEngine.getVkUserByVkId(
            getVkUserByVkIdReq
        );
        res.json(vkUser);
    })
);
router[Users.GetUser.Type](
    Users.GetUser.Rout,
    safeRoute(async (req: IGetUserAuthInfoRequest, res) => {
        const getUserReq: Users.GetUser.Req = {
            user_id: req.body.user_id,
        };

        const user: Users.GetUser.Res = await UsersEngine.getUser(getUserReq);
        res.json(user);
    })
);
router[Users.RateTags.Type](
    Users.RateTags.Rout,
    safeRoute(async (req: IGetUserAuthInfoRequest, res) => {
        const rateTagsReq: Users.RateTags.Req = {
            user_id: req.body.user_id,
            tags: req.body.tags,
            like: req.body.like,
        };

        await UsersEngine.rateTags(rateTagsReq);
        res.json();
    })
);
router[Users.RemoveUser.Type](
    Users.RemoveUser.Rout,
    safeRoute(async (req: IGetUserAuthInfoRequest, res) => {
        const removeUserReq: Users.RemoveUser.Req = {
            user_id: req.body.user_id,
        };

        await UsersEngine.removeUser(removeUserReq);
        res.json();
    })
);
router[Users.SetAccessLevel.Type](
    Users.SetAccessLevel.Rout,
    safeRoute(async (req: IGetUserAuthInfoRequest, res) => {
        const setAccessLevelReq: Users.SetAccessLevel.Req = {
            user_id: req.body.user_id,
            access_level: req.body.access_level,
        };

        await UsersEngine.setAccessLevel(setAccessLevelReq);
        res.json();
    })
);
router[Users.GetAccessLevel.Type](
    Users.GetAccessLevel.Rout,
    safeRoute(async (req: IGetUserAuthInfoRequest, res) => {
        const getAccessLevelReq: Users.GetAccessLevel.Req = {
            user_id: req.body.user_id,
        };

        const accessLevel = await UsersEngine.getAccessLevel(getAccessLevelReq);
        res.json(accessLevel);
    })
);

export default router;
