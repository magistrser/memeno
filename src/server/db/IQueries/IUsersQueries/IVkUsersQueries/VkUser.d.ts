import { UserId } from '../IUsersBaseQueries/User';

export type VkUserId = number;

export type VkUser = {
    vk_id: VkUserId;
    user_id: UserId;
    email?: string;
    full_name?: string;
    photo_url?: string;
    url: string;
};
