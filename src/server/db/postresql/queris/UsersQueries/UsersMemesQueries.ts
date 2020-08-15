import {
    AddUserMem,
    GetUserMemIds,
    IUsersMemesQueries,
    RemoveFromUsersMemes,
} from '../../../IQueries/IUsersQueries/IUsersMemesQueries';
import { MemId } from '../../../IQueries/IMemesQueries/IMemesBaseQueries/Mem';
import { IDatabase } from 'pg-promise';
import { IExtensions } from '../../index';

export default class UsersMemesQueries implements IUsersMemesQueries {
    constructor(private db: IDatabase<IExtensions>) {}

    addUserMem(req: AddUserMem): Promise<void> {
        return new Promise((res, reg) => res());
    }
    getUserMemIds(req: GetUserMemIds): Promise<MemId[]> {
        return new Promise((res, reg) => res([]));
    }
    removeFromUsersMemes(req: RemoveFromUsersMemes): Promise<void> {
        return new Promise((res, reg) => res());
    }
}
