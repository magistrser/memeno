import { IDatabase } from 'pg-promise';
import { IExtensions } from '../../index';
import IMemesTagsQueries, {
    AddMemTags,
    GetMemTags,
    RemoveMemTags,
} from '../../../IQueries/IMemesQueries/IMemesTagsQueries';
import { TagId } from '../../../IQueries/ITagsQueries/ITagsBaseQueries/Tag';

export default class MemesTagsQueries implements IMemesTagsQueries {
    constructor(private db: IDatabase<IExtensions>) {}

    addMemTags(req: AddMemTags): Promise<void> {
        return new Promise((res, reg) => res());
    }
    getMemTags(req: GetMemTags): Promise<TagId[]> {
        return new Promise((res, reg) => res([]));
    }
    removeMemTags(req: RemoveMemTags): Promise<void> {
        return new Promise((res, reg) => res());
    }
}
