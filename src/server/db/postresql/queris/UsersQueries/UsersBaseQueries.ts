import IUsersBaseQueries, {
    CreateNewUser,
    GetAccessLevel,
    GetUser,
    RemoveUser,
    SetAccessLevel,
    UpdateUserRating,
} from '../../../IQueries/IUsersQueries/IUsersBaseQueries';
import {
    User,
    UserId,
} from '../../../IQueries/IUsersQueries/IUsersBaseQueries/User';
import { IDatabase } from 'pg-promise';
import { IExtensions } from '../../index';
import { boolRatingToNumForQuery } from '../../boolRatingToNumForQuery';
import { AccessLevel } from '../../../IQueries/IUsersQueries/IUsersBaseQueries/AccessLevel';
import { VkUser } from '../../../IQueries/IUsersQueries/IVkUsersQueries/VkUser';

export default class UsersBaseQueries implements IUsersBaseQueries {
    constructor(private db: IDatabase<IExtensions>) {}

    createNewUser(req: CreateNewUser): Promise<UserId> {
        return this.db.one(
            'INSERT INTO users(auth_type, rating_update_time) VALUES($1, $2) RETURNING user_id',
            [req.auth_type, new Date().getTime()],
            (res) => res.user_id
        );
    }
    updateUserRating(req: UpdateUserRating): Promise<null> {
        return this.db.none(
            'UPDATE users SET rating = rating + $1, rating_update_time = $2 WHERE user_id = $3',
            [
                boolRatingToNumForQuery(req.like),
                new Date().getTime(),
                req.user_id,
            ]
        );
    }
    getUser(req: GetUser): Promise<User | null> {
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
    removeUser(req: RemoveUser): Promise<null> {
        return this.db.none('DELETE FROM users WHERE user_id = $1', [
            req.user_id,
        ]);
    }
    setAccessLevel(req: SetAccessLevel): Promise<null> {
        return this.db.none(
            'UPDATE users SET access_level = ${access_level} WHERE user_id = ${user_id}',
            req
        );
    }
    getAccessLevel(req: GetAccessLevel): Promise<AccessLevel> {
        return this.db.one(
            'SELECT access_level FROM users WHERE user_id = ${user_id}',
            req,
            (res) => res.access_level
        );
    }
}
