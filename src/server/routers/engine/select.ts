import SelectMemesEngine from '../../engine/postresql/SelectMemesEngine';
import express from 'express';
import { Select } from '../../../routes/engine/select';
import { IGetUserAuthInfoRequest } from '../../types';
import { GetTop } from '../../engine/IEngine/ISelectMemesEngine';

const router = express.Router();

router[Select.GetAverage.Type](
    Select.GetAverage.Rout,
    async (req: IGetUserAuthInfoRequest, res) => {
        const average: Select.GetAverage.Res = await SelectMemesEngine.getAverageTopRating();
        res.json(average);
    }
);
router[Select.GetTop.Type](
    Select.GetTop.Rout,
    async (req: IGetUserAuthInfoRequest, res) => {
        const getTopReq: Select.GetTop.Req = {
            ignore_memes: req.body.ignore_memes,
        };
        const getTop: GetTop = {
            user_id: req.user.user_id,
            ...getTopReq,
        };

        const memes: Select.GetTop.Res = await SelectMemesEngine.getTop(getTop);
        res.json(memes);
    }
);

export default router;
