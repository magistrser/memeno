import { UserId } from '../../IUsersQueries/IUsersBaseQueries/User';
import { MemId } from '../../IMemesQueries/IMemesBaseQueries/Mem';

export type GetAverageTopRating = {
    createdAfterDate: number;
    count: number;
};
export type GetTop = {
    user_id: UserId;
    ignore_memes: MemId[];
    ratingBarrier: number;
    createdAfterDate: number;
    count: number;
};
export type GetTagTop = {
    user_id: UserId;
    ratingBarrier: number;
    createdAfterDate: number;
    count: number;
};
export type GetNew = {
    user_id: UserId;
    createdAfterDate: number;
    count: number;
};
export type MemForClient = {
    mem_id: MemId;
    data: Buffer;
};

export default interface ISelectionMemesQueries {
    getAverageTopRating(req: GetAverageTopRating): Promise<number>;
    getTop(req: GetTop): Promise<MemForClient[]>;
    // getTagTop(req: GetTagTop): Promise<MemForClient[]>;
    // getNew(req: GetNew): Promise<MemForClient[]>;
}
