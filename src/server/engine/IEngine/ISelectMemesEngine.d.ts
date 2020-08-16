import { UserId } from '../../db/IQueries/IUsersQueries/IUsersBaseQueries/User';
import { MemId } from '../../db/IQueries/IMemesQueries/IMemesBaseQueries/Mem';
import { MemClient } from '../../../api/responses';

export type GetTop = {
    user_id: UserId;
};

export default interface ISelectMemesEngine {
    getAverageTopRating(): Promise<number>;
    getTop(req: GetTop): Promise<MemClient[]>;
}
