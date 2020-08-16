import {
    AddVkUser,
    CreateNewUser,
    GetVkUserByVkId,
    GetVkUserByUserId,
    GetUser,
    RateTags,
    RemoveUser,
} from '../../../server/engine/IEngine/IUsersEngine';

export type CreateNewUserReq = CreateNewUser;
export type AddVkUserReq = AddVkUser;
export type GetVkByUserIdReq = GetVkUserByUserId;
export type GetVkByVkIdReq = GetVkUserByVkId;
export type GetUserReq = GetUser;
export type RateTagsReq = RateTags;
export type RemoveUserReq = RemoveUser;
