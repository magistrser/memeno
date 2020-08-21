import {
    AddUserTagRating,
    GetUserTagRating,
    IUsersTagsRatingQueries,
    RemoveFromUsersTagsRating,
    UpdateUserTagRating,
} from '../../../IQueries/IUsersQueries/IUsersTagsRatingQueries';
import Tag from '../../../IQueries/ITagsQueries/ITagsBaseQueries/Tag';
import { IDatabase } from 'pg-promise';
import { IExtensions } from '../../index';
import { boolRatingToNumForQuery } from '../../boolRatingToNumForQuery';

export default class UsersTagsRatingQueries implements IUsersTagsRatingQueries {
    constructor(private db: IDatabase<IExtensions>) {}

    addUserTagRating(req: AddUserTagRating): Promise<null> {
        return this.db.none(
            'INSERT INTO users_tags_rating(user_id, tag, rating_update_time) VALUES($1, $2, $3) ON CONFLICT (user_id, tag) DO NOTHING',
            [req.user_id, req.tag, new Date().getTime()]
        );
    }
    updateUserTagRating(req: UpdateUserTagRating): Promise<null> {
        return this.db.none(
            'UPDATE users_tags_rating SET rating = rating + $1, rating_update_time = $2 WHERE user_id = $3 AND tag = $4',
            [
                boolRatingToNumForQuery(req.like),
                new Date().getTime(),
                req.user_id,
                req.tag,
            ]
        );
    }
    getUserTagRating(req: GetUserTagRating): Promise<Tag | null> {
        return this.db.oneOrNone(
            'SELECT * FROM users_tags_rating WHERE user_id = $1 AND tag = $2',
            [req.user_id, req.tag],
            (tag) => {
                if (!tag) {
                    return tag;
                }
                return {
                    ...tag,
                    rating: parseInt(tag.rating),
                    rating_update_time: parseInt(tag.rating_update_time),
                };
            }
        );
    }
    removeFromUsersTagsRating(req: RemoveFromUsersTagsRating): Promise<null> {
        return this.db.none(
            'DELETE FROM users_tags_rating WHERE user_id = $1',
            [req.user_id]
        );
    }
}
