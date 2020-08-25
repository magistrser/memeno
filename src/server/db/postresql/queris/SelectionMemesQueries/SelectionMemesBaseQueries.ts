import ISelectionMemesQueries, {
    GetAverageTopRating,
    GetNew,
    GetSmartTop,
    GetTagTop,
    GetTop,
    MemForClient,
} from '../../../IQueries/ISelectionMemesQueries/ISelectionMemesBaseQueries';
import { IDatabase } from 'pg-promise';
import { IExtensions } from '../../index';
import { MemId } from '../../../IQueries/IMemesQueries/IMemesBaseQueries/Mem';

function getFilterForMemesInPull(ignore_memes: MemId[]) {
    return ignore_memes.length
        ? ` AND mem_id NOT IN (` + ignore_memes.join(', ') + ')'
        : '';
}

export default class SelectionMemesBaseQueries
    implements ISelectionMemesQueries {
    constructor(private db: IDatabase<IExtensions>) {}

    getAverageTopRating(req: GetAverageTopRating): Promise<number> {
        return this.db.one(
            'SELECT AVG(Q.rating) FROM ( SELECT rating FROM memes WHERE creation_date > ${createdAfterDate} ORDER BY rating DESC FETCH FIRST ${count} ROWS ONLY) Q',
            req,
            (rating) => parseInt(rating.avg)
        );
    }
    getTop(req: GetTop): Promise<MemForClient[]> {
        return this.db.map(
            'SELECT * FROM memes WHERE mem_id NOT IN (SELECT mem_id FROM users_watched_memes WHERE user_id = ${user_id})' +
                ' AND creation_date > ${createdAfterDate}' +
                ' AND rating >= ${ratingBarrier}' +
                getFilterForMemesInPull(req.ignore_memes) +
                ' ORDER BY rating DESC FETCH FIRST ${count} ROWS ONLY',
            req,
            (mem) => {
                return {
                    mem_id: mem.mem_id,
                    data: mem.mem_data,
                };
            }
        );
    }
    getSmartTop(req: GetSmartTop): Promise<MemForClient[]> {
        return this.db.map(
            'SELECT * FROM memes WHERE mem_id NOT IN (SELECT mem_id FROM users_watched_memes WHERE user_id = ${user_id})' +
                ' AND creation_date > ${createdAfterDate}' +
                ' AND rating >= ${ratingBarrier}' +
                getFilterForMemesInPull(req.ignore_memes) +
                ' ORDER BY rating DESC FETCH FIRST ${count} ROWS ONLY',
            req,
            (mem) => {
                return {
                    mem_id: mem.mem_id,
                    data: mem.mem_data,
                };
            }
        );
    }
    // getTagTop(req: GetTagTop): Promise<MemForClient[]>;
    // getNew(req: GetNew): Promise<MemForClient[]>
}
