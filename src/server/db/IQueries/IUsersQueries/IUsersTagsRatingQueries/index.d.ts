import { Tag } from '../../../interface';
import { UserId } from '../IUsersBaseQueries/User';

export type AddUserTagRating = {
    user_id: UserId;
    tag: Tag;
};
export type UpdateUserTagRating = {
    user_id: UserId;
    tag: Tag;
    like: number;
};
export type GetUserTagRating = {
    user_id: UserId;
    tag: Tag;
};
export type RemoveFromUsersTagsRating = {
    user_id: UserId;
};

interface IUsersTagsRatingQueries {
    addUserTagRating: (req: AddUserTagRating) => Promise<void>;
    updateUserTagRating: (req: UpdateUserTagRating) => Promise<void>;
    getUserTagRating: (req: GetUserTagRating) => Promise<Tag>;
    removeFromUsersTagsRating: (
        req: RemoveFromUsersTagsRating
    ) => Promise<void>;
}
