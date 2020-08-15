import { VkUser, VkUserId } from './VkUser';

export type AddVkUserToVkUsers = VkUser;
export type GetVkUserByVkId = {
    vk_id: VkUserId;
};
export type GetVkUserByUserId = {
    user_id: VkUserId;
};
export type RemoveVkUser = GetVkUserByVkId;

interface IVkUsersQueries {
    addVkUserToVkUsers: (req: AddVkUserToVkUsers) => Promise<void>;
    getVkUserByVkId: (req: GetVkUserByVkId) => Promise<VkUser>;
    getVkUserByUserId: (req: GetVkUserByUserId) => Promise<VkUser>;
    removeVkUser: (req: RemoveVkUser) => Promise<void>;
}
