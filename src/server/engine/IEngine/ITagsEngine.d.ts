import { TagId } from '../../db/IQueries/ITagsQueries/ITagsBaseQueries/Tag';

export type AddTags = {
    tags: TagId[];
};
export type RateTags = {
    tags: TagId[];
    like: boolean;
};
export type RemoveTags = {
    tags: TagId[];
};

export default interface ITagsEngine {
    addTags(req: AddTags): Promise<void>;
    rateTags(req: RateTags): Promise<void>;
    removeTags(req: RemoveTags): Promise<void>;
}
