import routes from '../../../routes/routes';
import UsersEngine from '../../engine/postresql/UsersEngine';
import express from 'express';
import {
    AddVkUserReq,
    CreateNewUserReq,
    GetAccessLevelReq,
    GetUserReq,
    GetVkByUserIdReq,
    GetVkByVkIdReq,
    RateTagsReq,
    RemoveUserReq,
    SetAccessLevelReq,
} from '../../../api/engine/users/requests';
import {
    CreateNewUserRes,
    GetUserRes,
    GetVkByUserIdRes,
    GetVkUserByVkIdRes,
} from '../../../api/engine/users/responses';
import { IGetUserAuthInfoRequest } from '../../types';

const router = express.Router();

router.post(
    routes.server.engine.users.create,
    async (req: IGetUserAuthInfoRequest, res) => {
        const createNewUserReq: CreateNewUserReq = {
            auth_type: req.body.auth_type,
        };

        const user_id: CreateNewUserRes = await UsersEngine.createNewUser(
            createNewUserReq
        );
        res.json(user_id);
    }
);
router.post(
    routes.server.engine.users.addVk,
    async (req: IGetUserAuthInfoRequest, res) => {
        const addVkUserReq: AddVkUserReq = {
            vk_id: req.body.vk_id,
            email: req.body.email,
            full_name: req.body.full_name,
            photo_url: req.body.photo_url,
            url: req.body.url,
        };

        await UsersEngine.addVkUser(addVkUserReq);
        res.json();
    }
);
router.get(
    routes.server.engine.users.getVkByUserId,
    async (req: IGetUserAuthInfoRequest, res) => {
        const getVkUserByUserIdReq: GetVkByUserIdReq = {
            user_id: req.body.user_id,
        };

        const vkUser: GetVkByUserIdRes = await UsersEngine.getVkUserByUserId(
            getVkUserByUserIdReq
        );
        res.json(vkUser);
    }
);
router.get(
    routes.server.engine.users.getVkByVkId,
    async (req: IGetUserAuthInfoRequest, res) => {
        const getVkUserByVkIdReq: GetVkByVkIdReq = {
            vk_id: req.body.vk_id,
        };

        const vkUser: GetVkUserByVkIdRes = await UsersEngine.getVkUserByVkId(
            getVkUserByVkIdReq
        );
        res.json(vkUser);
    }
);
router.get(
    routes.server.engine.users.get,
    async (req: IGetUserAuthInfoRequest, res) => {
        const getUserReq: GetUserReq = {
            user_id: req.body.user_id,
        };

        const user: GetUserRes = await UsersEngine.getUser(getUserReq);
        res.json(user);
    }
);
router.post(
    routes.server.engine.users.rateTags,
    async (req: IGetUserAuthInfoRequest, res) => {
        const rateTagsReq: RateTagsReq = {
            user_id: req.body.user_id,
            tags: req.body.tags,
            like: req.body.like,
        };

        await UsersEngine.rateTags(rateTagsReq);
        res.json();
    }
);
router.delete(
    routes.server.engine.users.remove,
    async (req: IGetUserAuthInfoRequest, res) => {
        const removeUserReq: RemoveUserReq = {
            user_id: req.body.user_id,
        };

        await UsersEngine.removeUser(removeUserReq);
        res.json();
    }
);
router.post(
    routes.server.engine.users.setAccessLevel,
    async (req: IGetUserAuthInfoRequest, res) => {
        const setAccessLevelReq: SetAccessLevelReq = {
            user_id: req.body.user_id,
            access_level: req.body.access_level,
        };

        await UsersEngine.setAccessLevel(setAccessLevelReq);
        res.json();
    }
);
router.get(
    routes.server.engine.users.getAccessLevel,
    async (req: IGetUserAuthInfoRequest, res) => {
        const getAccessLevelReq: GetAccessLevelReq = {
            user_id: req.body.user_id,
        };

        const accessLevel = await UsersEngine.getAccessLevel(getAccessLevelReq);
        res.json(accessLevel);
    }
);

export default router;
