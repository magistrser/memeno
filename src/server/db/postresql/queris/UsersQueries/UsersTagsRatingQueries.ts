import {
    GetUserTagRating,
    IUsersTagsRatingQueries,
    RemoveFromUsersTagsRating,
    UpdateUserTagRating,
} from '../../../IQueries/IUsersQueries/IUsersTagsRatingQueries';
import { IDatabase } from 'pg-promise';
import { IExtensions } from '../../index';

export default class UsersTagsRatingQueries implements IUsersTagsRatingQueries {
    constructor(private db: IDatabase<IExtensions>) {}

    updateUserTagRating(req: UpdateUserTagRating): Promise<void> {
        return new Promise((res, reg) => res());
    }
    getUserTagRating(req: GetUserTagRating): Promise<number> {
        return new Promise((res, reg) => res(0));
    }
    removeFromUsersTagsRating(req: RemoveFromUsersTagsRating): Promise<void> {
        return new Promise((res, reg) => res());
    }
}
