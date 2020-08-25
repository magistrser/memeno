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
        return req.like > 0
            ? ', last_like_time = extract(epoch from now())'
            : '';
    }
    private static getConditionForUpdateDynamicRating(
        req: UpdateUserDynamicTagRating
    ) {
        return req.value > 0
            ? ' AND dynamic_rating < ${modulo_constraint}'
            : ' AND dynamic_rating > -${modulo_constraint}';
    }

    addUserTagRating(req: AddUserTagRating): Promise<null> {
        return this.db.none(
            'INSERT INTO users_tags_rating(user_id, tag, rating_update_time, last_like_time)' +
                ' VALUES(${user_id}, ${tag}, extract(epoch from now()), extract(epoch from now())) ON CONFLICT (user_id, tag) DO NOTHING',
            {
                ...req,
            }
        );
    }
    updateUserTagRating(req: UpdateUserTagRating): Promise<null> {
        return this.db.none(
            'UPDATE users_tags_rating SET rating = rating + ${like}, rating_update_time = extract(epoch from now())' +
                UsersTagsRatingQueries.updateLikeTimeIfNeed(req) +
                ' WHERE user_id = ${user_id} AND tag = ${tag}',
            {
                ...req,
                like: boolRatingToNumForQuery(req.like),
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
            'SELECT * FROM users_tags_rating WHERE user_id = ${user_id} AND tag = ${tag}',
            req,
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
            'DELETE FROM users_tags_rating WHERE user_id = ${user_id}',
            req
        );
    }
}
