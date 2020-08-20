import { UserId } from '../IUsersBaseQueries/User';
import { MemId } from '../../IMemesQueries/IMemesBaseQueries/Mem';

export type AddUserWatchedMem = {
    user_id: UserId;
    mem_id: MemId;
    like: number;
};
export type GetUserWatchedMemIds = {
    user_id: UserId;
};
export type RemoveFromUsersWatchedMemes = GetUserWatchedMemIds;

interface IUsersWatchedMemesQueries {
    addUserWatchedMem: (req: AddUserWatchedMem) => Promise<null>;
    getUserWatchedMemIds: (req: GetUserWatchedMemIds) => Promise<MemId[]>;
    removeFromUsersWatchedMemes: (
        req: RemoveFromUsersWatchedMemes
    ) => Promise<null>;
}
