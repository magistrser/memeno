import IUsersBaseQueries, {
    CreateNewUser,
    GetUser,
    RemoveUser,
    UpdateUserRating,
} from '../../../IQueries/IUsersQueries/IUsersBaseQueries';
import {
    User,
    UserId,
} from '../../../IQueries/IUsersQueries/IUsersBaseQueries/User';
import { IDatabase } from 'pg-promise';
import { IExtensions } from '../../index';

export default class UsersBaseQueries implements IUsersBaseQueries {
    constructor(private db: IDatabase<IExtensions>) {}

    createNewUser(req: CreateNewUser): Promise<UserId> {
        return this.db.one(
            'INSERT INTO users(auth_type, rating_update_time) VALUES($1, $2) RETURNING user_id',
            [req.auth_type, new Date().getTime()],
            (res) => res.user_id
        );
    }
    updateUserRating(req: UpdateUserRating): Promise<void> {
        return this.db.none(
            'UPDATE users SET rating = rating + $1, rating_update_time = $2 WHERE user_id = $3',
            [req.like ? 1 : -1, new Date().getTime(), req.user_id]
        );
    }
    getUser(req: GetUser): Promise<User> {
        return this.db.oneOrNone(
            'SELECT * FROM users WHERE user_id = $1',
            [req.user_id],
            (user) => {
                if (!user) {
                    return user;
                }
                return {
                    ...user,
                    rating: parseInt(user.rating),
                    rating_update_time: parseInt(user.rating_update_time),
                };
            }
        );
    }
    removeUser(req: RemoveUser): Promise<void> {
        return this.db.none('DELETE FROM users WHERE user_id = $1', [
            req.user_id,
        ]);
    }
}
