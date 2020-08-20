import SelectMemesEngine from '../../engine/postresql/SelectMemesEngine';
import express from 'express';
import { Select } from '../../../routes/engine/select';
import { IGetUserAuthInfoRequest } from '../../types';

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
            user_id: req.user.user_id,
        };

        const memes: Select.GetTop.Res = await SelectMemesEngine.getTop(
            getTopReq
        );
        res.json(memes);
    }
);

export default router;
