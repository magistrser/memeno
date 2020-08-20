import routes from '../../../routes/routes';
import SelectMemesEngine from '../../engine/postresql/SelectMemesEngine';
import express from 'express';
import {
    GetAverageRes,
    GetTopRes,
} from '../../../routes/engine/selectMemesEngine/responses';
import { GetTopReq } from '../../../routes/engine/selectMemesEngine/requests';
import { IGetUserAuthInfoRequest } from '../../types';

const router = express.Router();

router.get(
    routes.server.engine.select.average,
    async (req: IGetUserAuthInfoRequest, res) => {
        const average: GetAverageRes = await SelectMemesEngine.getAverageTopRating();
        res.json(average);
    }
);
router.get(
    routes.server.engine.select.top,
    async (req: IGetUserAuthInfoRequest, res) => {
        const getTopReq: GetTopReq = {
            user_id: req.user.user_id,
        };

        const memes: GetTopRes = await SelectMemesEngine.getTop(getTopReq);
        res.json(memes);
    }
);

export default router;
