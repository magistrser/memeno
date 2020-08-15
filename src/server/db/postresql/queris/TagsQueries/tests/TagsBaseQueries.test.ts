import 'babel-polyfill';
import { db, pgp } from '../../../index';

test('[TagsBaseQueries] addTag/getTag/removeTag', async () => {
    const tag = "pogchamp";
    await db.tags.tagsBaseQueries.addTag({tag});
    await db.tags.tagsBaseQueries.addTag({tag});

    const tagRating = await db.tags.tagsBaseQueries.getTag({tag});
    expect(tagRating).toMatchObject({
        tag,
        rating: 0,
    });

    await db.tags.tagsBaseQueries.removeTag({tag});
    const deletedTag = await db.tags.tagsBaseQueries.getTag({tag});
    expect(deletedTag).toBeNull();
})

test('[TagsBaseQueries] updateTagRating', async () => {
    const tag = "pogchamp";
    await db.tags.tagsBaseQueries.addTag({tag});

    await db.tags.tagsBaseQueries.updateTagRating({tag, like: 1});
    await db.tags.tagsBaseQueries.updateTagRating({tag, like: 1});
    await db.tags.tagsBaseQueries.updateTagRating({tag, like: 0});

    const tagRating = await db.tags.tagsBaseQueries.getTag({tag});
    expect(tagRating.rating).toBe(1);

    await db.tags.tagsBaseQueries.removeTag({tag});
})

afterAll(() => {
    pgp.end();
});