import {VkUser, VkUserId} from "../../db/IQueries/IUsersQueries/IVkUsersQueries/VkUser";
import {UserId} from "../../db/IQueries/IUsersQueries/IUsersBaseQueries/User";
import {TagId} from "../../db/IQueries/ITagsQueries/ITagsBaseQueries/Tag";

export type AddVkUser = {
    vk_id: VkUserId;
    email?: string;
    full_name?: string;
    photo_url?: string;
    url: string;
};
export type GetVkUserBiVkId = {
    vk_id: VkUserId;
}
export type GetVkUserBiUserId = {
    user_id: UserId;
}
export type RateTags = {
    user_id: UserId;
    tags: TagId[];
    like: boolean;
}
export type RemoveUser = {
    user_id: UserId;
};

export default interface IUsersEngine {
    addVkUser(req: AddVkUser): Promise<UserId>;
    getVkUserByVkId(req: GetVkUserBiVkId): Promise<VkUser>;
    getVkUserByUserId(req: GetVkUserBiUserId): Promise<VkUser>;
    rateTags(req: RateTags): Promise<void>;
    removeUser(req: RemoveUser): Promise<void>;
}