import { IDatabase } from 'pg-promise';
import { IExtensions } from '../../index';
import IMemesTagsQueries, {
    AddMemTag,
    GetMemTags,
    RemoveMemTags,
} from '../../../IQueries/IMemesQueries/IMemesTagsQueries';
import { TagId } from '../../../IQueries/ITagsQueries/ITagsBaseQueries/Tag';

export default class MemesTagsQueries implements IMemesTagsQueries {
    constructor(private db: IDatabase<IExtensions>) {}

    addMemTag(req: AddMemTag): Promise<null> {
        return this.db.none(
            'INSERT INTO memes_tags(mem_id, tag) VALUES(${mem_id}, ${tag}) ON CONFLICT (mem_id, tag) DO NOTHING',
            req
        );
    }
    getMemTags(req: GetMemTags): Promise<TagId[]> {
        return this.db.map(
            'SELECT tag FROM memes_tags WHERE mem_id = ${mem_id}',
            req,
            (obj) => obj.tag
        );
    }
    removeMemTags(req: RemoveMemTags): Promise<null> {
        return this.db.none(
            'DELETE FROM memes_tags WHERE mem_id = ${mem_id}',
            req
        );
    }
}
