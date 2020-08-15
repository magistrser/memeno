import { IDatabase } from 'pg-promise';
import { IExtensions } from '../../index';
import {
    AddTag,
    GetTag,
    ITagsBaseQueries,
    RemoveTag,
    UpdateTagRating,
} from '../../../IQueries/ITagsQueries/ITagsBaseQueries';
import Tag from '../../../IQueries/ITagsQueries/ITagsBaseQueries/Tag';

export default class TagsBaseQueries implements ITagsBaseQueries {
    constructor(private db: IDatabase<IExtensions>) {}

    addTag(req: AddTag): Promise<void> {
        return new Promise((res, reg) => res());
    }
    updateTagRating(req: UpdateTagRating): Promise<void> {
        return new Promise((res, reg) => res());
    }
    getTag(req: GetTag): Promise<Tag> {
        return new Promise((res, reg) => res());
    }
    removeTag(req: RemoveTag): Promise<void> {
        return new Promise((res, reg) => res());
    }
    removeTagFromMemesTags(req: RemoveTag): Promise<void> {
        return new Promise((res, reg) => res());
    }
    removeTagFromUsersTagsRating(req: RemoveTag): Promise<void> {
        return new Promise((res, reg) => res());
    }
}
