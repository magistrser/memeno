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
            'INSERT INTO users_memes(user_id, mem_id) VALUES (${user_id}, ${mem_id})',
            req
        );
    }
    getUserMemIds(req: GetUserMemIds): Promise<MemId[]> {
        return this.db.map(
            'SELECT mem_id FROM users_memes WHERE user_id = ${user_id}',
            req,
            (obj) => obj.mem_id
        );
    }
    removeFromUsersMemes(req: RemoveFromUsersMemes): Promise<null> {
        return this.db.none(
            'DELETE FROM users_memes WHERE user_id = ${user_id}',
            req
        );
    }
}
