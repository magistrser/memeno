import { UserId } from '../IUsersBaseQueries/User';
import { MemId } from '../../IMemesQueries/IMemesBaseQueries/Mem';

export type AddUserMem = {
    user_id: UserId;
    mem_id: MemId;
};
export type GetUserMemIds = {
    user_id: UserId;
};
export type RemoveFromUsersMemes = GetUserMemIds;

interface IUsersMemesQueries {
    addUserMem: (req: AddUserMem) => Promise<void>;
    getUserMemIds: (req: GetUserMemIds) => Promise<MemId[]>;
    removeFromUsersMemes: (req: RemoveFromUsersMemes) => Promise<void>;
}
