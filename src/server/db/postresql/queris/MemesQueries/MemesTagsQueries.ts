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
            'INSERT INTO memes_tags(mem_id, tag) VALUES($1, $2) ON CONFLICT (mem_id, tag) DO NOTHING',
            [req.mem_id, req.tag]
        );
    }
    getMemTags(req: GetMemTags): Promise<TagId[]> {
        return this.db.map(
            'SELECT tag FROM memes_tags WHERE mem_id = $1',
            [req.mem_id],
            (obj) => obj.tag
        );
    }
    removeMemTags(req: RemoveMemTags): Promise<null> {
        return this.db.none('DELETE FROM memes_tags WHERE mem_id = $1', [
            req.mem_id,
        ]);
    }
}
