import express from 'express';
import routes from '../../../routes/routes';
import MemesEngine from '../../engine/postresql/MemesEngine';
import {
    AddMemReq,
    RateMemReq,
    RemoveMemReq,
} from '../../../api/engine/memes/requests';
import { AddMemRes } from '../../../api/engine/memes/responses';
import { IGetUserAuthInfoRequest } from '../../types';

const router = express.Router();

router.post(
    routes.server.engine.memes.add,
    async (req: IGetUserAuthInfoRequest, res) => {
        const addMemReq: AddMemReq = {
            data: Buffer.from(req.body.data, 'base64'),
            tags: req.body.tags,
            user_id: req.body.user_id,
        };

        const mem_id: AddMemRes = await MemesEngine.addMem(addMemReq);
        res.json(mem_id);
    }
);
router.post(
    routes.server.engine.memes.rate,
    async (req: IGetUserAuthInfoRequest, res) => {
        const rateMemReq: RateMemReq = {
            user_id: 1,
            mem_id: req.body.mem_id,
            like: req.body.like,
        };

        await MemesEngine.rateMem(rateMemReq);
        res.json();
    }
);
router.delete(
    routes.server.engine.memes.remove,
    async (req: IGetUserAuthInfoRequest, res) => {
        const reqRemoveMem: RemoveMemReq = {
            mem_id: req.body.mem_id,
        };

        await MemesEngine.removeMem(reqRemoveMem);
        res.json();
    }
);

export default router;
