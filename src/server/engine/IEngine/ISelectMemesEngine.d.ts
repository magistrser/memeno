import {UserId} from "../../db/IQueries/IUsersQueries/IUsersBaseQueries/User";
import {MemForClient} from "../../db/IQueries/ISelectionMemesQueries/ISelectionMemesBaseQueries";

export type GetTop = {
    user_id: UserId
}

export default interface ISelectMemesEngine {
    getAverageTopRating(): Promise<number>;
    getTop(req: GetTop): Promise<MemForClient[]>;
}