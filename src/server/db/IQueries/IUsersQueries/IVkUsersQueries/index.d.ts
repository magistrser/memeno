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
    addVkUserToVkUsers: (req: AddVkUserToVkUsers) => Promise<null>;
    getVkUserByVkId: (req: GetVkUserByVkId) => Promise<VkUser | null>;
    getVkUserByUserId: (req: GetVkUserByUserId) => Promise<VkUser | null>;
    removeVkUser: (req: RemoveVkUser) => Promise<null>;
}
