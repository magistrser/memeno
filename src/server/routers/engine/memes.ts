import express from 'express';
import MemesEngine from '../../engine/postresql/MemesEngine';
import { Memes } from '../../../routes/engine/memes';
import { IGetUserAuthInfoRequest } from '../../types';
import { RateMem } from '../../engine/IEngine/IMemesEngine';

const router = express.Router();

router[Memes.AddMem.Type](
    Memes.AddMem.Rout,
    async (req: IGetUserAuthInfoRequest, res) => {
        const addMemReq: Memes.AddMem.Req = {
            data: Buffer.from(req.body.data, 'base64'),
            tags: req.body.tags,
            user_id: req.body.user_id,
        };

        const mem_id: Memes.AddMem.Res = await MemesEngine.addMem(addMemReq);
        res.json(mem_id);
    }
);
router[Memes.RateMem.Type](
    Memes.RateMem.Rout,
    async (req: IGetUserAuthInfoRequest, res) => {
        const rateMemReq: Memes.RateMem.Req = {
            mem_id: req.body.mem_id,
            like: req.body.like,
        };
        const rateMem: RateMem = {
            ...rateMemReq,
            user_id: req.user.user_id,
        };

        await MemesEngine.rateMem(rateMem);
        res.json();
    }
);
router[Memes.RemoveMem.Type](
    Memes.RemoveMem.Rout,
    async (req: IGetUserAuthInfoRequest, res) => {
        const reqRemoveMem: Memes.RemoveMem.Req = {
            mem_id: req.body.mem_id,
        };

        await MemesEngine.removeMem(reqRemoveMem);
        res.json();
    }
);

export default router;
