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

    addUserUserRating(req: AddUserUserRating): Promise<void> {
        return this.db.none(
            'INSERT INTO users_users_rating(user_id, second_user_id, rating_update_time) VALUES($1, $2, $3) ON CONFLICT (user_id, second_user_id) DO NOTHING',
            [req.user_id, req.second_user_id, new Date().getTime()]
        );
    }
    updateUserUserRating(req: UpdateUserUserRating): Promise<void> {
        return this.db.none(
            'UPDATE users_users_rating SET rating = rating + $1, rating_update_time = $2 WHERE user_id = $3 AND second_user_id = $4',
            [
                boolRatingToNumForQuery(req.like),
                new Date().getTime(),
                req.user_id,
                req.second_user_id,
            ]
        );
    }
    getUserUserRating(req: GetUserUserRating): Promise<UserUserRating> {
        return this.db.oneOrNone(
            'SELECT * FROM users_users_rating WHERE user_id = $1 AND second_user_id = $2',
            [req.user_id, req.second_user_id],
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
    removeFromUsersUsersRating(req: RemoveFromUsersUsersRating): Promise<void> {
        return this.db.none(
            'DELETE FROM users_users_rating WHERE user_id = $1 or second_user_id = $1',
            [req.user_id]
        );
    }
}
