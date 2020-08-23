import express from 'express';
import { IGetUserAuthInfoRequest } from '../../types';
import { Dev } from '../../../routes/engine/dev';
import DevEngine from '../../engine/postresql/DevEngine';
import safeRoute from '../../utils/safeRoute';

const router = express.Router();

router[Dev.DropUserWatchedMemes.Type](
    Dev.DropUserWatchedMemes.Rout,
    safeRoute(async (req: IGetUserAuthInfoRequest, res) => {
        const dropUserWatchedMemesReq: Dev.DropUserWatchedMemes.Req = {
            user_id: req.body.user_id,
        };

        await DevEngine.dropUserWatchedMemes(dropUserWatchedMemesReq);
        res.json();
    })
);
router[Dev.SetUserUserRating.Type](
    Dev.SetUserUserRating.Rout,
    safeRoute(async (req: IGetUserAuthInfoRequest, res) => {
        const setUserUserRatingReq: Dev.SetUserUserRating.Req = {
            user_id: req.body.user_id,
            second_user_id: req.body.second_user_id,
            rating: req.body.rating,
        };

        await DevEngine.setUserUserRating(setUserUserRatingReq);
        res.json();
    })
);
router[Dev.DropUserUsersRating.Type](
    Dev.DropUserUsersRating.Rout,
    safeRoute(async (req: IGetUserAuthInfoRequest, res) => {
        const dropUserUsersRatingReq: Dev.DropUserUsersRating.Req = {
            user_id: req.body.user_id,
        };

        await DevEngine.dropUserUsersRating(dropUserUsersRatingReq);
        res.json();
    })
);
router[Dev.SetUserTagRating.Type](
    Dev.SetUserTagRating.Rout,
    safeRoute(async (req: IGetUserAuthInfoRequest, res) => {
        const setUserTagRatingReq: Dev.SetUserTagRating.Req = {
            user_id: req.body.user_id,
            tag: req.body.tag,
            rating: req.body.rating,
        };

        await DevEngine.setUserTagRating(setUserTagRatingReq);
        res.json();
    })
);
router[Dev.DropUserTagsRating.Type](
    Dev.DropUserTagsRating.Rout,
    safeRoute(async (req: IGetUserAuthInfoRequest, res) => {
        const dropUserTagsRatingReq: Dev.DropUserTagsRating.Req = {
            user_id: req.body.user_id,
        };

        await DevEngine.dropUserTagsRating(dropUserTagsRatingReq);
        res.json();
    })
);
router[Dev.SetMemRating.Type](
    Dev.SetMemRating.Rout,
    safeRoute(async (req: IGetUserAuthInfoRequest, res) => {
        const setMemRatingReq: Dev.SetMemRating.Req = {
            mem_id: req.body.mem_id,
            rating: req.body.rating,
        };

        await DevEngine.setMemRating(setMemRatingReq);
        res.json();
    })
);
router[Dev.SetUserRating.Type](
    Dev.SetUserRating.Rout,
    safeRoute(async (req: IGetUserAuthInfoRequest, res) => {
        const setUserRatingReq: Dev.SetUserRating.Req = {
            user_id: req.body.user_id,
            rating: req.body.rating,
        };

        await DevEngine.setUserRating(setUserRatingReq);
        res.json();
    })
);
router[Dev.GetMyId.Type](
    Dev.GetMyId.Rout,
    safeRoute(async (req: IGetUserAuthInfoRequest, res) => {
        res.json(req.user.user_id);
    })
);
router[Dev.CleanDb.Type](
    Dev.CleanDb.Rout,
    safeRoute(async (req: IGetUserAuthInfoRequest, res) => {
        await DevEngine.cleanDb();
        res.json();
    })
);

export default router;
