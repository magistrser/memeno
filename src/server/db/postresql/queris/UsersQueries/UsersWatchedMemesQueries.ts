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

    addUserWatchedMem(req: AddUserWatchedMem): Promise<null> {
        return this.db.none(
            'INSERT INTO users_watched_memes(user_id, mem_id, is_like, watched_time) VALUES(${user_id}, ${mem_id}, ${like}, extract(epoch from now())) ON CONFLICT (user_id, mem_id) DO NOTHING',
            req
        );
    }
    getUserWatchedMemIds(req: GetUserWatchedMemIds): Promise<MemId[]> {
        return this.db.map(
            'SELECT mem_id FROM users_watched_memes WHERE user_id = ${user_id}',
            req,
            (obj) => obj.mem_id
        );
    }
    removeFromUsersWatchedMemes(
        req: RemoveFromUsersWatchedMemes
    ): Promise<null> {
        return this.db.none(
            'DELETE FROM users_watched_memes WHERE user_id = ${user_id}',
            req
        );
    }
}
