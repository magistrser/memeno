import ISelectMemesEngine, {
    GetSmartTop,
    GetTop,
} from '../IEngine/ISelectMemesEngine';
import { db } from '../../db/postresql';
import { MemClient } from '../../../routes/MemClient';
import testRecommendationSystem from '../../recommendation-system/TestRecommendationSystem';
import { MemForClient } from '../../db/IQueries/ISelectionMemesQueries/ISelectionMemesBaseQueries';

function memesDataToClientMemes(memes: MemForClient[]) {
    return memes.map((mem) => {
        return {
            source: 'data:image/jpeg;base64,' + mem.data.toString('base64'),
            mem_id: mem.mem_id,
        };
    });
}

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

        return memesDataToClientMemes(memes);
    }
    static async getSmartTop(req: GetSmartTop): Promise<MemClient[]> {
        const recommendation_system = testRecommendationSystem;
        const memes = await db.selectMemes.selectionMemesBaseQueries.getSmartTop(
            {
                ...req,
                recommendation_system,
            }
        );

        return memesDataToClientMemes(memes);
    }
};

export default SelectMemesEngine;
