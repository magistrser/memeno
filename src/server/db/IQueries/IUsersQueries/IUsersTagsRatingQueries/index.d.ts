import { UserId } from '../IUsersBaseQueries/User';
import Tag, { TagId } from '../../ITagsQueries/ITagsBaseQueries/Tag';

export type AddUserTagRating = {
    user_id: UserId;
    tag: TagId;
};
export type UpdateUserTagRating = {
    user_id: UserId;
    tag: TagId;
    like: number;
};
export type UpdateUserDynamicTagRating = {
    user_id: UserId;
    tag: TagId;
    value: number;
    modulo_constraint: number;
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
    updateUserTagDynamicRating: (
        req: UpdateUserDynamicTagRating
    ) => Promise<null>;
    getUserTagRating: (req: GetUserTagRating) => Promise<Tag | null>;
    removeFromUsersTagsRating: (
        req: RemoveFromUsersTagsRating
    ) => Promise<null>;
}
