import Tag, { TagId } from './Tag';

export type AddTag = {
    tag: TagId;
};
export type UpdateTagRating = {
    tag: TagId;
    like: number;
};
export type GetTag = {
    tag: TagId;
};
export type RemoveTag = GetTag;

export interface ITagsBaseQueries {
    addTag: (req: AddTag) => Promise<null>;
    updateTagRating: (req: UpdateTagRating) => Promise<null>;
    getTag: (req: GetTag) => Promise<Tag | null>;
    removeTag: (req: RemoveTag) => Promise<null>;
    removeTagFromMemesTags: (req: RemoveTag) => Promise<null>;
    removeTagFromUsersTagsRating: (req: RemoveTag) => Promise<null>;
}
