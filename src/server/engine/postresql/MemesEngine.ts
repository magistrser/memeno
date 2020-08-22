import IMemesEngine, {
    AddMem,
    RemoveMem,
    RateMem,
} from '../IEngine/IMemesEngine';
import { MemId } from '../../db/IQueries/IMemesQueries/IMemesBaseQueries/Mem';
import { db } from '../../db/postresql';
import TagsEngine from './TagsEngine';
import UsersEngine from './UsersEngine';

const MemesEngine: IMemesEngine = class {
    static addMem(req: AddMem): Promise<MemId> {
        return db.tx(async (transaction) => {
            const mem_id = await transaction.memes.memesBaseQueries.addMem({
                mem_data: req.data,
                user_id: req.user_id,
            });
            await transaction.users.usersMemesQueries.addUserMem({
                user_id: req.user_id,
                mem_id,
            });

            await TagsEngine.addTags({ tags: req.tags });
            await TagsEngine.rateTags({ tags: req.tags, like: true });
            await UsersEngine.rateTags({
                tags: req.tags,
                user_id: req.user_id,
                like: true,
            });

            for (let i = 0; i < req.tags.length; ++i) {
                await transaction.memes.memesTagsQueries.addMemTag({
                    mem_id,
                    tag: req.tags[i],
                });
            }
            await transaction.users.usersWatchedMemesQueries.addUserWatchedMem({
                mem_id,
                user_id: req.user_id,
                like: 1,
            });

            return mem_id;
        });
    }
    static removeMem(req: RemoveMem): Promise<void> {
        return db.tx(async (transaction) => {
            await transaction.memes.memesBaseQueries.removeFromUsersMemes(req);
            await transaction.memes.memesBaseQueries.removeFromUsersWatchedMemes(
                req
            );
            await transaction.memes.memesTagsQueries.removeMemTags(req);
            await transaction.memes.memesBaseQueries.removeMem(req);
        });
    }
    static rateMem(req: RateMem): Promise<void> {
        return db.tx(async (transaction) => {
            const like = req.like ? 1 : 0;

            await transaction.users.usersWatchedMemesQueries.addUserWatchedMem({
                user_id: req.user_id,
                mem_id: req.mem_id,
                like,
            });

            // db for avoid deadlock
            await db.memes.memesBaseQueries.updateMemRating({
                mem_id: req.mem_id,
                like,
            });

            const mem = await transaction.memes.memesBaseQueries.getMem(req);
            if (!mem) {
                return;
            }

            await transaction.users.usersUsersRatingQueries.addUserUserRating({
                user_id: req.user_id,
                second_user_id: mem.user_id,
            });
            await transaction.users.usersUsersRatingQueries.updateUserUserRating(
                { user_id: req.user_id, second_user_id: mem.user_id, like }
            );

            // db for avoid deadlock
            await db.users.usersBaseQueries.updateUserRating({
                user_id: mem.user_id,
                like,
            });

            const tags = await transaction.memes.memesTagsQueries.getMemTags(
                req
            );
            const tagsRate = { tags, like: req.like };
            await TagsEngine.rateTags(tagsRate);
            await UsersEngine.rateTags({ ...tagsRate, user_id: req.user_id });
        });
    }
};

export default MemesEngine;
