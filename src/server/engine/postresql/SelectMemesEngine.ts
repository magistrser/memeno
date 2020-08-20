import ISelectMemesEngine, { GetTop } from '../IEngine/ISelectMemesEngine';
import { db } from '../../db/postresql';
import { MemClient } from '../../../routes/MemClient';

const SelectMemesEngine: ISelectMemesEngine = class {
    static getAverageTopRating(): Promise<number> {
        const req = {
            createdAfterDate: 0,
            count: 10,
        };
        return db.selectMemes.selectionMemesBaseQueries.getAverageTopRating(
            req
        );
    }
    static async getTop(req: GetTop): Promise<MemClient[]> {
        const engine = {
            ratingBarrier: 0,
            createdAfterDate: 0,
            count: 10,
        };

        const memes = await db.selectMemes.selectionMemesBaseQueries.getTop({
            ...req,
            ...engine,
        });
        return memes.map((mem) => {
            return {
                source: 'data:image/jpeg;base64,' + mem.data.toString('base64'),
                mem_id: mem.mem_id,
            };
        });
    }
};

export default SelectMemesEngine;
