import ISelectMemesEngine, {GetTop} from "../IEngine/ISelectMemesEngine";
import {MemForClient} from "../../db/IQueries/ISelectionMemesQueries/ISelectionMemesBaseQueries";
import {db} from "../../db/postresql";

const SelectMemesEngine: ISelectMemesEngine = class {
    static getAverageTopRating(): Promise<number>{
        const req = {
            createdAfterDate: 0,
            count: 10
        };
        return db.selectMemes.selectionMemesBaseQueries.getAverageTopRating(req);
    }
    static getTop(req: GetTop): Promise<MemForClient[]>{
        const engine = {
            ratingBarrier: 0,
            createdAfterDate: 0,
            count: 10
        }
        return db.selectMemes.selectionMemesBaseQueries.getTop({...req, ...engine});
    }
}

export default SelectMemesEngine;