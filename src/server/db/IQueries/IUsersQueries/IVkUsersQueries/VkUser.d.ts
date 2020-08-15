import { UserId } from '../IUsersBaseQueries/User';

export type VkUserId = number;

export type VkUser = {
    vk_id: VkUserId;
    user_id: UserId;
    email: string | null;
    fullName: string | null;
    photoUrl: string | null;
    vkProfileUrl: string;
};
