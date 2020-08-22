import IDevEngine from '../IEngine/IDevEngine';
import {
    DropUserTagsRating,
    DropUserUsersRating,
    DropUserWatchedMemes,
    SetMemRating,
    SetUserRating,
    SetUserTagRating,
    SetUserUserRating,
} from '../../db/IQueries/IDevQueries/IDevBaseQueries';
import { db } from '../../db/postresql';

const DevEngine: IDevEngine = class {
    static dropUserWatchedMemes(req: DropUserWatchedMemes): Promise<null> {
        return db.dev.devBaseQueries.dropUserWatchedMemes(req);
    }
    static setUserUserRating(req: SetUserUserRating): Promise<void> {
        return db.tx(async (transaction) => {
            await transaction.users.usersUsersRatingQueries.addUserUserRating(
                req
            );
            await transaction.dev.devBaseQueries.setUserUserRating(req);
        });
    }
    static dropUserUsersRating(req: DropUserUsersRating): Promise<void> {
        return db.tx(async (transaction) => {
            await transaction.dev.devBaseQueries.dropUserTagsRating(req);
        });
    }
    static setUserTagRating(req: SetUserTagRating): Promise<void> {
        return db.tx(async (transaction) => {
            await transaction.users.usersTagsRatingQueries.addUserTagRating(
                req
            );
            await transaction.dev.devBaseQueries.setUserTagRating(req);
        });
    }
    static dropUserTagsRating(req: DropUserTagsRating): Promise<void> {
        return db.tx(async (transaction) => {
            await transaction.dev.devBaseQueries.dropUserTagsRating(req);
        });
    }
    static setMemRating(req: SetMemRating): Promise<void> {
        return db.tx(async (transaction) => {
            await transaction.dev.devBaseQueries.setMemRating(req);
        });
    }
    static setUserRating(req: SetUserRating): Promise<void> {
        return db.tx(async (transaction) => {
            await transaction.dev.devBaseQueries.setUserRating(req);
        });
    }
    static async cleanDb(): Promise<void> {
        await db.dev.devBaseQueries.deleteAllRows({
            table_name: 'users_tags_rating',
        });
        await db.dev.devBaseQueries.deleteAllRows({
            table_name: 'users_users_rating',
        });
        await db.dev.devBaseQueries.deleteAllRows({
            table_name: 'users_watched_memes',
        });
        await db.dev.devBaseQueries.deleteAllRows({
            table_name: 'users_memes',
        });
        await db.dev.devBaseQueries.deleteAllRows({ table_name: 'memes_tags' });
        await db.dev.devBaseQueries.deleteAllRows({ table_name: 'memes' });
        await db.dev.devBaseQueries.deleteAllRows({ table_name: 'tags' });
    }
};

export default DevEngine;
