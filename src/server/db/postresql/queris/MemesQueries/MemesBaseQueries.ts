import { IDatabase } from 'pg-promise';
import { IExtensions } from '../../index';
import IMemesBaseQueries, {
    AddNewMem,
    GetMem,
    RemoveMem,
    UpdateMemRating,
} from '../../../IQueries/IMemesQueries/IMemesBaseQueries';
import {
    Mem,
    MemId,
} from '../../../IQueries/IMemesQueries/IMemesBaseQueries/Mem';
import { boolRatingToNumForQuery } from '../../boolRatingToNumForQuery';

export default class MemesBaseQueries implements IMemesBaseQueries {
    constructor(private db: IDatabase<IExtensions>) {}

    addMem(req: AddNewMem): Promise<MemId> {
        return this.db.one(
            'INSERT INTO memes(mem_data, user_id, rating_update_time) VALUES(${mem_data}, ${user_id}, extract(epoch from now())) RETURNING mem_id',
            req,
            (res) => res.mem_id
        );
    }
    updateMemRating(req: UpdateMemRating): Promise<null> {
        return this.db.none(
            'UPDATE memes SET rating = rating + ${like}, rating_update_time = extract(epoch from now()) WHERE mem_id = ${mem_id}',
            { like: boolRatingToNumForQuery(req.like), mem_id: req.mem_id }
        );
    }
    getMem(req: GetMem): Promise<Mem | null> {
        return this.db.oneOrNone(
            'SELECT * FROM memes WHERE mem_id = ${mem_id}',
            req,
            (mem) => {
                if (!mem) {
                    return mem;
                }

                return {
                    ...mem,
                    creation_date: parseInt(mem.creation_date),
                    rating: parseInt(mem.rating),
                    rating_update_time: parseInt(mem.rating_update_time),
                };
            }
        );
    }
    removeMem(req: RemoveMem): Promise<null> {
        return this.db.none('DELETE FROM memes WHERE mem_id = ${mem_id}', req);
    }
    removeFromUsersMemes(req: RemoveMem): Promise<null> {
        return this.db.none(
            'DELETE FROM users_memes WHERE mem_id = ${mem_id}',
            req
        );
    }
    removeFromUsersWatchedMemes(req: RemoveMem): Promise<null> {
        return this.db.none(
            'DELETE FROM users_watched_memes WHERE mem_id = ${mem_id}',
            req
        );
    }
}
