import {
    AddUserTagRating,
    GetUserTagRating,
    IUsersTagsRatingQueries,
    RemoveFromUsersTagsRating,
    UpdateUserDynamicTagRating,
    UpdateUserTagRating,
} from '../../../IQueries/IUsersQueries/IUsersTagsRatingQueries';
import Tag from '../../../IQueries/ITagsQueries/ITagsBaseQueries/Tag';
import { IDatabase } from 'pg-promise';
import { IExtensions } from '../../index';
import { boolRatingToNumForQuery } from '../../boolRatingToNumForQuery';

export default class UsersTagsRatingQueries implements IUsersTagsRatingQueries {
    constructor(private db: IDatabase<IExtensions>) {}

    private static updateLikeTimeIfNeed(req: UpdateUserTagRating): string {
        return req.like > 0 ? ', last_like_time = ${update_time}' : '';
    }
    private static getConditionForUpdateDynamicRating(
        req: UpdateUserDynamicTagRating
    ) {
        return req.value > 0
            ? ' AND dynamic_rating < ${modulo_constraint}'
            : ' AND dynamic_rating > -${modulo_constraint}';
    }

    addUserTagRating(req: AddUserTagRating): Promise<null> {
        const update_time = new Date().getTime();
        return this.db.none(
            'INSERT INTO users_tags_rating(user_id, tag, rating_update_time, last_like_time)' +
                ' VALUES(${user_id}, ${tag}, ${update_time}, ${update_time}) ON CONFLICT (user_id, tag) DO NOTHING',
            {
                ...req,
                update_time,
            }
        );
    }
    updateUserTagRating(req: UpdateUserTagRating): Promise<null> {
        const update_time = new Date().getTime();
        return this.db.none(
            'UPDATE users_tags_rating SET rating = rating + ${like}, rating_update_time = ${update_time}' +
                UsersTagsRatingQueries.updateLikeTimeIfNeed(req) +
                ' WHERE user_id = ${user_id} AND tag = ${tag}',
            {
                ...req,
                like: boolRatingToNumForQuery(req.like),
                update_time,
            }
        );
    }
    updateUserTagDynamicRating(req: UpdateUserDynamicTagRating): Promise<null> {
        return this.db.none(
            'UPDATE users_tags_rating SET dynamic_rating = dynamic_rating + ${value}' +
                ' WHERE user_id = ${user_id} AND tag = ${tag}' +
                UsersTagsRatingQueries.getConditionForUpdateDynamicRating(req),
            req
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
                    dynamic_rating: parseInt(tag.dynamic_rating),
                    rating_update_time: parseInt(tag.rating_update_time),
                    last_like_time: parseInt(tag.last_like_time),
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
