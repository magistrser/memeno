import { UserId } from '../IUsersBaseQueries/User';
import { MemId } from '../../IMemesQueries/IMemesBaseQueries/Mem';

export type AddUserWatchedMem = {
    user_id: UserId;
    mem_id: MemId;
    is_like: number;
};
export type GetUserWatchedMemIds = {
    user_id: UserId;
};
export type RemoveFromUsersWatchedMemes = GetUserWatchedMemIds;

interface IUsersWatchedMemesQueries {
    addUserWatchedMem: (req: AddUserWatchedMem) => Promise<void>;
    getUserWatchedMemIds: (req: GetUserWatchedMemIds) => Promise<MemId[]>;
    removeFromUsersWatchedMemes: (
        req: RemoveFromUsersWatchedMemes
    ) => Promise<void>;
}
