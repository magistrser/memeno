import { VkUser, VkUserId } from './VkUser';

export type AddVkUserToVkUsers = VkUser;
export type GetVkUserIfExist = {
    vk_id: VkUserId;
};
export type RemoveVkUser = GetVkUserIfExist;

interface IVkUsersQueries {
    addVkUserToVkUsers: (req: AddVkUserToVkUsers) => Promise<void>;
    getVkUserIfExist: (req: GetVkUserIfExist) => Promise<VkUser | void>;
    removeVkUser: (req: RemoveVkUser) => Promise<void>;
}
