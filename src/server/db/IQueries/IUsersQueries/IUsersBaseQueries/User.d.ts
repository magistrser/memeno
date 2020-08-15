import { AuthType } from './index';

export type UserId = number;

export type User = {
    user_id: UserId;
    auth_type: AuthType;
    rating: number;
    rating_update_time: number;
};
