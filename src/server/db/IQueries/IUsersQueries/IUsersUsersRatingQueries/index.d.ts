import { UserId } from '../IUsersBaseQueries/User';

export type UserUserRating = {
    user_id: UserId;
    second_user_id: UserId;
    rating: number;
    rating_update_time: number;
};
export type AddUserUserRating = {
    user_id: UserId;
    second_user_id: UserId;
};
export type UpdateUserUserRating = {
    user_id: UserId;
    second_user_id: UserId;
    like: number;
};
export type GetUserUserRating = {
    user_id: UserId;
    second_user_id: UserId;
};
export type RemoveFromUsersUsersRating = {
    user_id: UserId;
};

interface IUsersUsersRatingQueries {
    addUserUserRating: (req: AddUserUserRating) => Promise<void>;
    updateUserUserRating: (req: UpdateUserUserRating) => Promise<void>;
    getUserUserRating: (req: GetUserUserRating) => Promise<UserUserRating>;
    removeFromUsersUsersRating: (
        req: RemoveFromUsersUsersRating
    ) => Promise<void>;
}
