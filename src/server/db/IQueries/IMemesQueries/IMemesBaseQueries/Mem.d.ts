import { UserId } from '../../IUsersQueries/IUsersBaseQueries/User';

export type MemId = number;

export type Mem = {
    mem_id: MemId;
    mem_data: Buffer;
    creation_date: number;
    user_id: UserId;
    rating: number;
    rating_update_time: number;
};
