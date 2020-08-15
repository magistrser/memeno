import {
    AddUserWatchedMem,
    GetUserWatchedMemIds,
    IUsersWatchedMemesQueries,
    RemoveFromUsersWatchedMemes,
} from '../../../IQueries/IUsersQueries/IUsersWatchedMemesQueries';
import { MemId } from '../../../IQueries/IMemesQueries/IMemesBaseQueries/Mem';
import { IDatabase } from 'pg-promise';
import { IExtensions } from '../../index';

export default class UsersWatchedMemesQueries
    implements IUsersWatchedMemesQueries {
    constructor(private db: IDatabase<IExtensions>) {}

    addUserWatchedMem(req: AddUserWatchedMem): Promise<void> {
        return new Promise((res, reg) => res());
    }
    getUserWatchedMemIds(req: GetUserWatchedMemIds): Promise<MemId[]> {
        return new Promise((res, reg) => res([]));
    }
    removeFromUsersWatchedMemes(
        req: RemoveFromUsersWatchedMemes
    ): Promise<void> {
        return new Promise((res, reg) => res());
    }
}
