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

export default class MemesBaseQueries implements IMemesBaseQueries {
    constructor(private db: IDatabase<IExtensions>) {}

    addMem(req: AddNewMem): Promise<MemId> {
        return this.db.one(
            'INSERT INTO memes(mem_data, creation_date, user_id, rating_update_time) VALUES($1, $2, $3, $4) RETURNING mem_id',
            [
                req.mem_data,
                new Date().getTime(),
                req.user_id,
                new Date().getTime(),
            ],
            (res) => res.mem_id
        );
    }
    updateMemRating(req: UpdateMemRating): Promise<void> {
        return this.db.none(
            'UPDATE memes SET rating = rating + $1 WHERE mem_id = $2',
            [req.like ? 1 : -1, req.mem_id]
        );
    }
    getMem(req: GetMem): Promise<Mem> {
        return this.db.oneOrNone(
            'SELECT * FROM memes WHERE mem_id = $1',
            [req.mem_id],
            mem => {
                if(!mem) {
                    return mem;
                }

                return {
                    ...mem,
                    creation_date: parseInt(mem.creation_date),
                    rating: parseInt(mem.rating),
                    rating_update_time: parseInt(mem.rating_update_time),
                }
            }
        );
    }
    removeMem(req: RemoveMem): Promise<void> {
        return this.db.none('DELETE FROM memes WHERE mem_id = $1', [
            req.mem_id,
        ]);
    }
    removeFromUsersMemes(req: RemoveMem): Promise<void> {
        return new Promise((res, reg) => res());
    }
    removeFromUsersMemesRating(req: RemoveMem): Promise<void> {
        return new Promise((res, reg) => res());
    }
}
