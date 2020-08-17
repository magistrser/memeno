import routes from '../../../routes';
import express from 'express';
import TagsEngine from '../../engine/postresql/TagsEngine';
import {
    AddTagsReq,
    RateTagsReq,
    RemoveTagReq,
} from '../../../api/engine/tags/requests';
import { IGetUserAuthInfoRequest } from '../../types';

const router = express.Router();

router.post(
    routes.server.engine.tags.add,
    async (req: IGetUserAuthInfoRequest, res) => {
        const addTagsReq: AddTagsReq = {
            tags: req.body.tags,
        };

        await TagsEngine.addTags(addTagsReq);
        res.json();
    }
);
router.post(
    routes.server.engine.tags.rate,
    async (req: IGetUserAuthInfoRequest, res) => {
        const rateTagsReq: RateTagsReq = {
            tags: req.body.tags,
            like: req.body.like,
        };

        await TagsEngine.rateTags(rateTagsReq);
        res.json();
    }
);
router.post(
    routes.server.engine.tags.remove,
    async (req: IGetUserAuthInfoRequest, res) => {
        const removeTagsReq: RemoveTagReq = {
            tags: req.body.tags,
        };

        await TagsEngine.removeTags(removeTagsReq);
        res.json();
    }
);

export default router;
