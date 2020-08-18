import { IDatabase } from 'pg-promise';
import { IExtensions } from '../../index';
import IDevBaseQueries, {
    DropUserTagsRating,
    DropUserUsersRating,
    DropUserWatchedMemes,
    SetMemRating,
    SetUserRating,
    SetUserTagRating,
    SetUserUserRating,
} from '../../../IQueries/IDevQueries/IDevBaseQueries';

export default class DevBaseQueries implements IDevBaseQueries {
    constructor(private db: IDatabase<IExtensions>) {}

    dropUserWatchedMemes(req: DropUserWatchedMemes): Promise<void> {
        return this.db.none(
            'DELETE FROM users_watched_memes WHERE user_id = ${user_id}',
            req
        );
    }
    setUserUserRating(req: SetUserUserRating): Promise<void> {
        return this.db.none(
            'UPDATE users_users_rating SET rating = ${rating} WHERE user_id = ${user_id} AND second_user_id = ${second_user_id}',
            req
        );
    }
    dropUserUsersRating(req: DropUserUsersRating): Promise<void> {
        return this.db.none(
            'UPDATE users_users_rating SET rating = 0 WHERE user_id = ${user_id}',
            req
        );
    }
    setUserTagRating(req: SetUserTagRating): Promise<void> {
        return this.db.none(
            'UPDATE users_tags_rating SET rating = ${rating} WHERE user_id = ${user_id} AND tag =${tag}',
            req
        );
    }
    dropUserTagsRating(req: DropUserTagsRating): Promise<void> {
        return this.db.none(
            'UPDATE users_tags_rating SET rating = 0 WHERE user_id = ${user_id}',
            req
        );
    }
    setMemRating(req: SetMemRating): Promise<void> {
        return this.db.none(
            'UPDATE memes SET rating = ${rating} WHERE mem_id = ${mem_id}',
            req
        );
    }
    setUserRating(req: SetUserRating): Promise<void> {
        return this.db.none(
            'UPDATE users SET rating = ${rating} WHERE user_id = ${user_id}',
            req
        );
    }
}
