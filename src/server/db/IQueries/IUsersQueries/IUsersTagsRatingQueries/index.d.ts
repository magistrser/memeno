import { UserId } from '../IUsersBaseQueries/User';
import Tag, { TagId } from '../../ITagsQueries/ITagsBaseQueries/Tag';
import { VkUser } from '../IVkUsersQueries/VkUser';

export type Tag = {
    user_id: UserId;
    tag: TagId;
};
export type AddUserTagRating = {
    user_id: UserId;
    tag: TagId;
};
export type UpdateUserTagRating = {
    user_id: UserId;
    tag: TagId;
    like: number;
};
export type GetUserTagRating = {
    user_id: UserId;
    tag: TagId;
};
export type RemoveFromUsersTagsRating = {
    user_id: UserId;
};

interface IUsersTagsRatingQueries {
    addUserTagRating: (req: AddUserTagRating) => Promise<null>;
    updateUserTagRating: (req: UpdateUserTagRating) => Promise<null>;
    getUserTagRating: (req: GetUserTagRating) => Promise<Tag | null>;
    removeFromUsersTagsRating: (
        req: RemoveFromUsersTagsRating
    ) => Promise<null>;
}
