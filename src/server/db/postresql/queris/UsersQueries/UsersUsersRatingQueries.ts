import {
    AddUserUserRating,
    GetUserUserRating,
    IUsersUsersRatingQueries,
    RemoveFromUsersUsersRating,
    UpdateUserUserRating,
    UserUserRating,
} from '../../../IQueries/IUsersQueries/IUsersUsersRatingQueries';
import { IDatabase } from 'pg-promise';
import { IExtensions } from '../../index';
import { boolRatingToNumForQuery } from '../../boolRatingToNumForQuery';

export default class UsersUsersRatingQueries
    implements IUsersUsersRatingQueries {
    constructor(private db: IDatabase<IExtensions>) {}

    addUserUserRating(req: AddUserUserRating): Promise<null> {
        return this.db.none(
            'INSERT INTO users_users_rating(user_id, second_user_id, rating_update_time) VALUES(${user_id}, ${second_user_id}, extract(epoch from now())) ON CONFLICT (user_id, second_user_id) DO NOTHING',
            req
        );
    }
    updateUserUserRating(req: UpdateUserUserRating): Promise<null> {
        return this.db.none(
            'UPDATE users_users_rating SET rating = rating + ${like}, rating_update_time = extract(epoch from now()) WHERE user_id = ${user_id} AND second_user_id = ${second_user_id}',
            { ...req, like: boolRatingToNumForQuery(req.like) }
        );
    }
    getUserUserRating(req: GetUserUserRating): Promise<UserUserRating | null> {
        return this.db.oneOrNone(
            'SELECT * FROM users_users_rating WHERE user_id = ${user_id} AND second_user_id = ${second_user_id}',
            req,
            (userRating) => {
                if (!userRating) {
                    return userRating;
                }
                return {
                    ...userRating,
                    rating: parseInt(userRating.rating),
                    rating_update_time: parseInt(userRating.rating_update_time),
                };
            }
        );
    }
    removeFromUsersUsersRating(req: RemoveFromUsersUsersRating): Promise<null> {
        return this.db.none(
            'DELETE FROM users_users_rating WHERE user_id = ${user_id} or second_user_id = ${user_id}',
            req
        );
    }
}
