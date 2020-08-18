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

interface IDevBaseQueries {
    dropUserWatchedMemes(req: DropUserWatchedMemes): Promise<void>;
    setUserUserRating(req: SetUserUserRating): Promise<void>;
    dropUserUsersRating(req: DropUserUsersRating): Promise<void>;
    setUserTagRating(req: SetUserTagRating): Promise<void>;
    dropUserTagsRating(req: DropUserTagsRating): Promise<void>;
    setMemRating(req: SetMemRating): Promise<void>;
    setUserRating(req: SetUserRating): Promise<void>;
}

export default IDevBaseQueries;
