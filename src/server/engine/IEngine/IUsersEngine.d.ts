import {
    VkUser,
    VkUserId,
} from '../../db/IQueries/IUsersQueries/IVkUsersQueries/VkUser';
import {
    User,
    UserId,
} from '../../db/IQueries/IUsersQueries/IUsersBaseQueries/User';
import { TagId } from '../../db/IQueries/ITagsQueries/ITagsBaseQueries/Tag';
import { AuthType } from '../../db/IQueries/IUsersQueries/IUsersBaseQueries/AuthType';

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
export type RemoveUser = {
    user_id: UserId;
};

export default interface IUsersEngine {
    addVkUser(req: AddVkUser): Promise<UserId>;
    getVkUserByVkId(req: GetVkUserByVkId): Promise<VkUser>;
    getVkUserByUserId(req: GetVkUserByUserId): Promise<VkUser>;
    createNewUser(req: CreateNewUser): Promise<UserId>;
    getUser(req: GetUser): Promise<User>;
    rateTags(req: RateTags): Promise<void>;
    removeUser(req: RemoveUser): Promise<void>;
}
