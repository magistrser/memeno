import { UserId } from '../../db/IQueries/IUsersQueries/IUsersBaseQueries/User';
import { MemId } from '../../db/IQueries/IMemesQueries/IMemesBaseQueries/Mem';
import { MemClient } from '../../../routes/MemClient';

export type GetTop = {
    user_id: UserId;
    ignore_memes: MemId[];
};
export type GetSmartTop = GetTop;

export default interface ISelectMemesEngine {
    getAverageTopRating(): Promise<number>;
    getTop(req: GetTop): Promise<MemClient[]>;
    getSmartTop(req: GetSmartTop): Promise<MemClient[]>;
}
