import ISelectionMemesQueries, {
    GetAverageTopRating,
    GetMemesToShowForUser,
    GetMemesToShowForUserMem, GetNew, GetTagTop, GetTop, MemForClient
} from "../../../IQueries/ISelectionMemesQueries/ISelectionMemesBaseQueries";
import {IDatabase} from "pg-promise";
import {IExtensions} from "../../index";
import {MemId} from "../../../IQueries/IMemesQueries/IMemesBaseQueries/Mem";

export default class SelectionMemesBaseQueries implements ISelectionMemesQueries {
    constructor(private db: IDatabase<IExtensions>) {}

    getAverageTopRating(req: GetAverageTopRating): Promise<number>{
        return this.db.one(
            'SELECT AVG(Q.rating) FROM ( SELECT rating FROM memes WHERE creation_date > ${createdAfterDate} ORDER BY rating DESC FETCH FIRST ${count} ROWS ONLY) Q',
            req,
        );
    }
    getTop(req: GetTop): Promise<MemForClient[]> {
        return this.db.map(
            'SELECT * FROM memes WHERE mem_id NOT IN (SELECT mem_id FROM users_watched_memes WHERE user_id = ${user_id}) AND creation_date > ${createdAfterDate} AND rating > ${ratingBarrier} ORDER BY rating DESC FETCH FIRST ${count} ROWS ONLY',
            req,
            (mem) => {
                return {
                    mem_id: mem.mem_data,
                    data: mem.mem_data
                };
            }
        );
    }
    // getTagTop(req: GetTagTop): Promise<MemForClient[]>;
    // getNew(req: GetNew): Promise<MemForClient[]>
}