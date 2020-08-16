import ITagsEngine, {
    AddTags,
    RateTags,
    RemoveTag,
} from '../IEngine/ITagsEngine';
import { db } from '../../db/postresql';

const TagsEngine: ITagsEngine = class {
    static addTags(req: AddTags): Promise<void> {
        return db.tx(async (transaction) => {
            for (let i = 0; i < req.tags.length; ++i) {
                await transaction.tags.tagsBaseQueries.addTag({
                    tag: req.tags[i],
                });
            }
        });
    }
    static rateTags(req: RateTags): Promise<void> {
        return db.tx(async (transaction) => {
            const like = req.like ? 1 : 0;
            for (let i = 0; i < req.tags.length; ++i) {
                await transaction.tags.tagsBaseQueries.updateTagRating({
                    tag: req.tags[i],
                    like,
                });
            }
        });
    }
    static removeTag(req: RemoveTag): Promise<void> {
        return db.tx(async (transaction) => {
            await transaction.tags.tagsBaseQueries.removeTagFromMemesTags(req);
            await transaction.tags.tagsBaseQueries.removeTagFromUsersTagsRating(
                req
            );
            await transaction.tags.tagsBaseQueries.removeTag(req);
        });
    }
};

export default TagsEngine;
