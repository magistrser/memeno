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
        return this.db.none(
            'INSERT INTO tags(tag, rating_update_time) VALUES($1, $2) ON CONFLICT (tag) DO NOTHING',
            [req.tag, new Date().getTime()],
        );
    }
    updateTagRating(req: UpdateTagRating): Promise<void> {
        return this.db.none(
            'UPDATE tags SET rating = rating + $1 WHERE tag = $2',
            [req.like ? 1 : -1, req.tag]
        );
    }
    getTag(req: GetTag): Promise<Tag> {
        return this.db.oneOrNone(
            'SELECT * FROM tags WHERE tag = $1',
            [req.tag],
            (tag) => {
                if (!tag) {
                    return tag;
                }
                return {
                    ...tag,
                    rating: parseInt(tag.rating),
                    rating_update_time: parseInt(tag.rating_update_time),
                };
            }
        );
    }
    removeTag(req: RemoveTag): Promise<void> {
        return this.db.none('DELETE FROM tags WHERE tag = $1', [
            req.tag,
        ]);
    }
    removeTagFromMemesTags(req: RemoveTag): Promise<void> {
        return new Promise((res, reg) => res());
    }
    removeTagFromUsersTagsRating(req: RemoveTag): Promise<void> {
        return new Promise((res, reg) => res());
    }
}
