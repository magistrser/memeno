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
            'INSERT INTO users_watched_memes(user_id, mem_id, is_like, watched_time) VALUES($1, $2, $3, $4) ON CONFLICT (user_id, mem_id) DO NOTHING',
            [req.user_id, req.mem_id, req.like, new Date().getTime()]
        );
    }
    getUserWatchedMemIds(req: GetUserWatchedMemIds): Promise<MemId[]> {
        return this.db.map(
            'SELECT mem_id FROM users_watched_memes WHERE user_id = $1',
            [req.user_id],
            (obj) => obj.mem_id
        );
    }
    removeFromUsersWatchedMemes(
        req: RemoveFromUsersWatchedMemes
    ): Promise<null> {
        return this.db.none(
            'DELETE FROM users_watched_memes WHERE user_id = $1',
            [req.user_id]
        );
    }
}
