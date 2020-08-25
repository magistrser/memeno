import {
    VkUser,
    VkUserId,
} from '../../db/IQueries/IUsersQueries/IVkUsersQueries/VkUser';
import {
    User,
    UserId,
} from '../../db/IQueries/IUsersQueries/IUsersBaseQueries/User';
import {
    SetAccessLevel as SetAccessLevelQueriesReq,
    GetAccessLevel as GetAccessLevelQueriesReq,
} from '../../db/IQueries/IUsersQueries/IUsersBaseQueries';
import { TagId } from '../../db/IQueries/ITagsQueries/ITagsBaseQueries/Tag';
import { AuthType } from '../../db/IQueries/IUsersQueries/IUsersBaseQueries/AuthType';
import { AccessLevel } from '../../db/IQueries/IUsersQueries/IUsersBaseQueries/AccessLevel';
import IRecommendationSystem from '../../recommendation-system/IRecommendationSystem';

export type AddVkUser = {
    vk_id: VkUserId;
    email?: string;
    full_name?: string;
    photo_url?: string;
    url: string;
};
export type GetVkUserByVkId = {
    vk_id: VkUserId;
};
export type GetVkUserByUserId = {
    user_id: UserId;
};
export type CreateNewUser = {
    auth_type: AuthType;
};
export type GetUser = {
    user_id: UserId;
};
export type RateTags = {
    user_id: UserId;
    tags: TagId[];
    like: boolean;
};
export type RateDynamicTags = {
    user_id: UserId;
    tags: TagId[];
    like: boolean;
    recommendation_system: IRecommendationSystem;
};
export type RemoveUser = {
    user_id: UserId;
};
export type SetAccessLevel = SetAccessLevelQueriesReq;
export type GetAccessLevel = GetAccessLevelQueriesReq;

export default interface IUsersEngine {
    addVkUser(req: AddVkUser): Promise<UserId>;
    getVkUserByVkId(req: GetVkUserByVkId): Promise<VkUser | null>;
    getVkUserByUserId(req: GetVkUserByUserId): Promise<VkUser | null>;
    createNewUser(req: CreateNewUser): Promise<UserId>;
    getUser(req: GetUser): Promise<User | null>;
    rateTags(req: RateTags): Promise<void>;
    rateDynamicTags(req: RateDynamicTags): Promise<void>;
    removeUser(req: RemoveUser): Promise<void>;
    setAccessLevel(req: SetAccessLevel): Promise<null>;
    getAccessLevel(req: GetAccessLevel): Promise<AccessLevel | null>;
}
