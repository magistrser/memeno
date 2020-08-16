import { db } from '../../../index';

export default class TagsQueriesUtils {
    static async createTag(
        next: (args: any[]) => Promise<void>,
        args: any[] = []
    ): Promise<void> {
        const tag = Math.random().toString(16).substring(7);
        await db.tags.tagsBaseQueries.addTag({ tag });

        args.push(tag);
        await next(args);

        await db.tags.tagsBaseQueries.removeTag({ tag });
        const deletedTag = await db.tags.tagsBaseQueries.getTag({ tag });
        expect(deletedTag).toBeNull();
    }
}
