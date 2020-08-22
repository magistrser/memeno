import ITagsEngine, {
    AddTags,
    RateTags,
    RemoveTags,
} from '../IEngine/ITagsEngine';
import { db } from '../../db/postresql';

const TagsEngine: ITagsEngine = class {
    static async addTags(req: AddTags): Promise<void> {
        for (let i = 0; i < req.tags.length; ++i) {
            await db.tags.tagsBaseQueries.addTag({
                tag: req.tags[i],
            });
        }
    }
    static async rateTags(req: RateTags): Promise<void> {
        const like = req.like ? 1 : 0;
        for (let i = 0; i < req.tags.length; ++i) {
            await db.tags.tagsBaseQueries.updateTagRating({
                tag: req.tags[i],
                like,
            });
        }
    }
    static removeTags(req: RemoveTags): Promise<void> {
        return db.tx(async (transaction) => {
            for (let i = 0; i < req.tags.length; ++i) {
                const removeTagReq = { tag: req.tags[i] };

                await transaction.tags.tagsBaseQueries.removeTagFromMemesTags(
                    removeTagReq
                );
                await transaction.tags.tagsBaseQueries.removeTagFromUsersTagsRating(
                    removeTagReq
                );
                await transaction.tags.tagsBaseQueries.removeTag(removeTagReq);
            }
        });
    }
};

export default TagsEngine;
