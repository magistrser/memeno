import routes from '../../../routes/routes';
import express from 'express';
import TagsEngine from '../../engine/postresql/TagsEngine';
import { Tags } from '../../../routes/engine/tags';
import { IGetUserAuthInfoRequest } from '../../types';

const router = express.Router();

router[Tags.AddTags.Type](
    Tags.AddTags.Rout,
    async (req: IGetUserAuthInfoRequest, res) => {
        const addTagsReq: Tags.AddTags.Req = {
            tags: req.body.tags,
        };

        await TagsEngine.addTags(addTagsReq);
        res.json();
    }
);
router[Tags.RateTags.Type](
    Tags.RateTags.Rout,
    async (req: IGetUserAuthInfoRequest, res) => {
        const rateTagsReq: Tags.RateTags.Req = {
            tags: req.body.tags,
            like: req.body.like,
        };

        await TagsEngine.rateTags(rateTagsReq);
        res.json();
    }
);
router[Tags.RemoveTags.Type](
    Tags.RemoveTags.Rout,
    async (req: IGetUserAuthInfoRequest, res) => {
        const removeTagsReq: Tags.RemoveTags.Req = {
            tags: req.body.tags,
        };

        await TagsEngine.removeTags(removeTagsReq);
        res.json();
    }
);

export default router;
