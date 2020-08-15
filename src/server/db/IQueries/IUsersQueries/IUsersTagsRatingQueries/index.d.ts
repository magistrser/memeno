import { TagId } from '../../../interface';
import { UserId } from '../IUsersBaseQueries/User';

export type UpdateUserTagRating = {
    user_id: UserId;
    tag: Tag;
    is_like: number;
};
export type GetUserTagRating = {
    user_id: UserId;
    tag: UserId;
};
export type RemoveFromUsersTagsRating = {
    user_id: UserId;
};

interface IUsersTagsRatingQueries {
    updateUserTagRating: (req: UpdateUserTagRating) => Promise<void>;
    getUserTagRating: (req: GetUserTagRating) => Promise<number>;
    removeFromUsersTagsRating: (
        req: RemoveFromUsersTagsRating
    ) => Promise<void>;
}
