import { MemId } from '../IMemesBaseQueries/Mem';
import { TagId } from '../../ITagsQueries/ITagsBaseQueries/Tag';

export type AddMemTags = {
    mem_id: MemId;
    tags: TagId[];
};
export type GetMemTags = {
    mem_id: MemId;
};
export type RemoveMemTags = GetMemTags;

export default interface IMemesTagsQueries {
    addMemTags: (req: AddMemTags) => Promise<void>;
    getMemTags: (req: GetMemTags) => Promise<TagId[]>;
    removeMemTags: (req: RemoveMemTags) => Promise<void>;
}
