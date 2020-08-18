import express from 'express';
import routes from '../../../routes';
import { IGetUserAuthInfoRequest } from '../../types';
import {
    DropUserTagsRatingReq,
    DropUserUsersRatingReq,
    DropUserWatchedMemesReq,
    SetMemRatingReq,
    SetUserRatingReq,
    SetUserTagRatingReq,
    SetUserUserRatingReq,
} from '../../../api/engine/dev/responses';
import DevEngine from '../../engine/postresql/DevEngine';

const router = express.Router();

router.post(
    routes.server.engine.dev.dropUserWatchedMemes,
    async (req: IGetUserAuthInfoRequest, res) => {
        const dropUserWatchedMemesReq: DropUserWatchedMemesReq = {
            user_id: req.body.user_id,
        };

        await DevEngine.dropUserWatchedMemes(dropUserWatchedMemesReq);
        res.json();
    }
);
router.post(
    routes.server.engine.dev.setUserUserRating,
    async (req: IGetUserAuthInfoRequest, res) => {
        const setUserUserRatingReq: SetUserUserRatingReq = {
            user_id: req.body.user_id,
            second_user_id: req.body.second_user_id,
            rating: req.body.rating,
        };

        await DevEngine.setUserUserRating(setUserUserRatingReq);
        res.json();
    }
);
router.post(
    routes.server.engine.dev.dropUserUsersRating,
    async (req: IGetUserAuthInfoRequest, res) => {
        const dropUserUsersRatingReq: DropUserUsersRatingReq = {
            user_id: req.body.user_id,
        };

        await DevEngine.dropUserUsersRating(dropUserUsersRatingReq);
        res.json();
    }
);
router.post(
    routes.server.engine.dev.setUserTagRating,
    async (req: IGetUserAuthInfoRequest, res) => {
        const setUserTagRatingReq: SetUserTagRatingReq = {
            user_id: req.body.user_id,
            tag: req.body.tag,
            rating: req.body.rating,
        };

        await DevEngine.setUserTagRating(setUserTagRatingReq);
        res.json();
    }
);
router.post(
    routes.server.engine.dev.dropUserTagsRating,
    async (req: IGetUserAuthInfoRequest, res) => {
        const dropUserTagsRatingReq: DropUserTagsRatingReq = {
            user_id: req.body.user_id,
        };

        await DevEngine.dropUserTagsRating(dropUserTagsRatingReq);
        res.json();
    }
);
router.post(
    routes.server.engine.dev.setMemRating,
    async (req: IGetUserAuthInfoRequest, res) => {
        const setMemRatingReq: SetMemRatingReq = {
            mem_id: req.body.mem_id,
            rating: req.body.rating,
        };

        await DevEngine.setMemRating(setMemRatingReq);
        res.json();
    }
);
router.post(
    routes.server.engine.dev.setUserRating,
    async (req: IGetUserAuthInfoRequest, res) => {
        const setUserRatingReq: SetUserRatingReq = {
            user_id: req.body.user_id,
            rating: req.body.rating,
        };

        await DevEngine.setUserRating(setUserRatingReq);
        res.json();
    }
);

export default router;
