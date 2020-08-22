/*
DevQueries + DevEngine
- [ ] DropUserWatchedMemes
- [ ] DropUserUserRating
- [ ] DropUserTagsRating
- [ ] DropMemesRating
- [ ] DropUsersRating
- [ ] Drop DB
*/

import { UserId } from '../IUsersQueries/IUsersBaseQueries/User';
import { TagId } from '../ITagsQueries/ITagsBaseQueries/Tag';
import { MemId } from '../IMemesQueries/IMemesBaseQueries/Mem';

export type DropUserWatchedMemes = {
    user_id: UserId;
};
export type SetUserUserRating = {
    user_id: UserId;
    second_user_id: UserId;
    rating: number;
};
export type DropUserUsersRating = {
    user_id: UserId;
};
export type SetUserTagRating = {
    user_id: UserId;
    tag: TagId;
    rating: number;
};
export type DropUserTagsRating = {
    user_id: UserId;
};
export type SetMemRating = {
    mem_id: MemId;
    rating: number;
};
export type SetUserRating = {
    user_id: UserId;
    rating: number;
};
export type DeleteAllRows = {
    table_name: string;
};

interface IDevBaseQueries {
    dropUserWatchedMemes(req: DropUserWatchedMemes): Promise<null>;
    setUserUserRating(req: SetUserUserRating): Promise<null>;
    dropUserUsersRating(req: DropUserUsersRating): Promise<null>;
    setUserTagRating(req: SetUserTagRating): Promise<null>;
    dropUserTagsRating(req: DropUserTagsRating): Promise<null>;
    setMemRating(req: SetMemRating): Promise<null>;
    setUserRating(req: SetUserRating): Promise<null>;
    deleteAllRows(req: DeleteAllRows): Promise<null>;
}

export default IDevBaseQueries;
