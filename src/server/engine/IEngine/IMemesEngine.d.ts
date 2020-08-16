import { TagId } from '../../db/IQueries/ITagsQueries/ITagsBaseQueries/Tag';
import { UserId } from '../../db/IQueries/IUsersQueries/IUsersBaseQueries/User';
import { MemId } from '../../db/IQueries/IMemesQueries/IMemesBaseQueries/Mem';

export type AddMem = {
    data: Buffer;
    tags: TagId[];
    user_id: UserId;
};
export type RemoveMem = {
    mem_id: MemId;
};
export type RateMem = {
    user_id: UserId;
    mem_id: MemId;
    like: boolean;
};

export default interface IMemesEngine {
    addMem(req: AddMem): Promise<MemId>;
    removeMem(req: RemoveMem): Promise<void>;
    rateMem(req: RateMem): Promise<void>;
}
