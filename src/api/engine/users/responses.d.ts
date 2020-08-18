import { VkUser } from '../../../server/db/IQueries/IUsersQueries/IVkUsersQueries/VkUser';
import { User } from '../../../server/db/IQueries/IUsersQueries/IUsersBaseQueries/User';
import { AccessLevel } from '../../../server/db/IQueries/IUsersQueries/IUsersBaseQueries/AccessLevel';

export type CreateNewUserRes = number;
export type GetVkByUserIdRes = VkUser;
export type GetVkUserByVkIdRes = VkUser;
export type GetUserRes = User;
export type GetAccessLevelRes = AccessLevel;
