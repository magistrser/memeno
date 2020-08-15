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
    addTag: (req: AddTag) => Promise<void>;
    updateTagRating: (req: UpdateTagRating) => Promise<void>;
    getTag: (req: GetTag) => Promise<Tag>;
    removeTag: (req: RemoveTag) => Promise<void>;
    removeTagFromMemesTags: (req: RemoveTag) => Promise<void>;
    removeTagFromUsersTagsRating: (req: RemoveTag) => Promise<void>;
}
