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
        return new Promise((res, reg) => res());
    }
    getUser(req: GetUser): Promise<User | void> {
        return new Promise((res, reg) => res());
    }
    removeUser(req: RemoveUser): Promise<void> {
        return new Promise((res, reg) => res());
    }
}
