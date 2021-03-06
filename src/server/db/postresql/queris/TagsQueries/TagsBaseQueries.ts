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
import { boolRatingToNumForQuery } from '../../boolRatingToNumForQuery';

export default class TagsBaseQueries implements ITagsBaseQueries {
    constructor(private db: IDatabase<IExtensions>) {}

    addTag(req: AddTag): Promise<null> {
        return this.db.none(
            'INSERT INTO tags(tag, rating_update_time) VALUES(${tag},  extract(epoch from now())) ON CONFLICT (tag) DO NOTHING',
            req
        );
    }
    updateTagRating(req: UpdateTagRating): Promise<null> {
        return this.db.none(
            'UPDATE tags SET rating = rating + ${like}, rating_update_time = extract(epoch from now()) WHERE tag = ${tag}',
            { like: boolRatingToNumForQuery(req.like), tag: req.tag }
        );
    }
    getTag(req: GetTag): Promise<Tag | null> {
        return this.db.oneOrNone(
            'SELECT * FROM tags WHERE tag = ${tag}',
            req,
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
    removeTag(req: RemoveTag): Promise<null> {
        return this.db.none('DELETE FROM tags WHERE tag = ${tag}', req);
    }
    removeTagFromMemesTags(req: RemoveTag): Promise<null> {
        return this.db.none('DELETE FROM memes_tags WHERE tag = ${tag}', req);
    }
    removeTagFromUsersTagsRating(req: RemoveTag): Promise<null> {
        return this.db.none(
            'DELETE FROM users_tags_rating WHERE tag = ${tag}',
            req
        );
    }
}
