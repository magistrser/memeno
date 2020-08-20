import { MemId } from '../IMemesBaseQueries/Mem';
import { TagId } from '../../ITagsQueries/ITagsBaseQueries/Tag';

export type AddMemTag = {
    mem_id: MemId;
    tag: TagId;
};
export type GetMemTags = {
    mem_id: MemId;
};
export type RemoveMemTags = GetMemTags;

export default interface IMemesTagsQueries {
    addMemTag: (req: AddMemTag) => Promise<null>;
    getMemTags: (req: GetMemTags) => Promise<TagId[]>;
    removeMemTags: (req: RemoveMemTags) => Promise<null>;
}
