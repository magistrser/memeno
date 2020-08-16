import { VkUser } from '../../../server/db/IQueries/IUsersQueries/IVkUsersQueries/VkUser';
import { User } from '../../../server/db/IQueries/IUsersQueries/IUsersBaseQueries/User';

export type CreateNewUserRes = number;
export type GetVkByUserIdRes = VkUser;
export type GetVkUserByVkIdRes = VkUser;
export type GetUserRes = User;
