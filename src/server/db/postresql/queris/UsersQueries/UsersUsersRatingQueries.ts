import {
    GetUserUserRating,
    IUsersUsersRatingQueries,
    RemoveFromUsersUsersRating,
    UpdateUserUserRating,
} from '../../../IQueries/IUsersQueries/IUsersUsersRatingQueries';
import { IDatabase } from 'pg-promise';
import { IExtensions } from '../../index';

export default class UsersUsersRatingQueries
    implements IUsersUsersRatingQueries {
    constructor(private db: IDatabase<IExtensions>) {}

    updateUserUserRating(req: UpdateUserUserRating): Promise<void> {
        return new Promise((res, reg) => res());
    }
    getUserUserRating(req: GetUserUserRating): Promise<number> {
        return new Promise((res, reg) => res(0));
    }
    removeFromUsersUsersRating(req: RemoveFromUsersUsersRating): Promise<void> {
        return new Promise((res, reg) => res());
    }
}
