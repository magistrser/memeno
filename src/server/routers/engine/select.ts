import SelectMemesEngine from '../../engine/postresql/SelectMemesEngine';
import express from 'express';
import { Select } from '../../../routes/engine/select';
import { IGetUserAuthInfoRequest } from '../../types';
import { GetSmartTop, GetTop } from '../../engine/IEngine/ISelectMemesEngine';
import safeRoute from '../../utils/safeRoute';
import { MemId } from '../../db/IQueries/IMemesQueries/IMemesBaseQueries/Mem';

const router = express.Router();

router[Select.GetAverage.Type](
    Select.GetAverage.Rout,
    safeRoute(async (req: IGetUserAuthInfoRequest, res) => {
        const average: Select.GetAverage.Res = await SelectMemesEngine.getAverageTopRating();
        res.json(average);
    })
);
router[Select.GetTop.Type](
    Select.GetTop.Rout,
    safeRoute(async (req: IGetUserAuthInfoRequest, res) => {
        const getTopReq: Select.GetTop.Req = {
            ignore_memes: req.body.ignore_memes,
        };
        const getTop: GetTop = {
            user_id: req.user.user_id,
            ...getTopReq,
        };

        const memes: Select.GetTop.Res = await SelectMemesEngine.getTop(getTop);
        res.json(memes);
    })
);
router[Select.GetSmartTop.Type](
    Select.GetSmartTop.Rout,
    safeRoute(async (req: IGetUserAuthInfoRequest, res) => {
        const getTopReq: Select.GetSmartTop.Req = {
            ignore_memes: req.body.ignore_memes,
        };
        const getTop: GetSmartTop = {
            user_id: req.user.user_id,
            ...getTopReq,
        };

        const memes: Select.GetSmartTop.Res = await SelectMemesEngine.getSmartTop(
            getTop
        );

        res.json(memes);
    })
);

export default router;
