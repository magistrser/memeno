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

    addUserMem(req: AddUserMem): Promise<null> {
        return this.db.none(
            'INSERT INTO users_memes(user_id, mem_id) VALUES ($1, $2)',
            [req.user_id, req.mem_id]
        );
    }
    getUserMemIds(req: GetUserMemIds): Promise<MemId[]> {
        return this.db.map(
            'SELECT mem_id FROM users_memes WHERE user_id = $1',
            [req.user_id],
            (obj) => obj.mem_id
        );
    }
    removeFromUsersMemes(req: RemoveFromUsersMemes): Promise<null> {
        return this.db.none('DELETE FROM users_memes WHERE user_id = $1', [
            req.user_id,
        ]);
    }
}
