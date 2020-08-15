import { UserId } from '../IUsersBaseQueries/User';

export type UpdateUserUserRating = {
    user_id: UserId;
    second_user_id: UserId;
    is_like: number;
};
export type GetUserUserRating = {
    user_id: UserId;
    second_user_id: UserId;
};
export type RemoveFromUsersUsersRating = {
    user_id: UserId;
};

interface IUsersUsersRatingQueries {
    updateUserUserRating: (req: UpdateUserUserRating) => Promise<void>;
    getUserUserRating: (req: GetUserUserRating) => Promise<number>;
    removeFromUsersUsersRating: (
        req: RemoveFromUsersUsersRating
    ) => Promise<void>;
}
