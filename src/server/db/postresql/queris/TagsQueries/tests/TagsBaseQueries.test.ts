import 'babel-polyfill';
import { db, pgp } from '../../../index';
import { AuthType } from '../../../../IQueries/IUsersQueries/IUsersBaseQueries/AuthType';
import TagsQueriesUtils from './utils';
import UsersQueriesUtils from '../../UsersQueries/tests/utils';
import MemesQueriesUtils from '../../MemesQueries/tests/utils';

test('[TagsBaseQueries] addTag/getTag/removeTag', async () => {
    await TagsQueriesUtils.createTag(async ([tag]) => {
        await db.tags.tagsBaseQueries.addTag({ tag });
        const tagRating = await db.tags.tagsBaseQueries.getTag({ tag });
        expect(tagRating).toMatchObject({
            tag,
            rating: 0,
        });
    });
});

test('[TagsBaseQueries] updateTagRating', async () => {
    await TagsQueriesUtils.createTag(async ([tag]) => {
        await db.tags.tagsBaseQueries.updateTagRating({ tag, like: 1 });
        await db.tags.tagsBaseQueries.updateTagRating({ tag, like: 1 });
        await db.tags.tagsBaseQueries.updateTagRating({ tag, like: 0 });

        const tagRating = await db.tags.tagsBaseQueries.getTag({ tag });
        expect(tagRating.rating).toBe(1);
    });
});

test('[TagsBaseQueries] removeTagFromMemesTags', async () => {
    await UsersQueriesUtils.createUser(async (args) => {
        await MemesQueriesUtils.createMem(async ([user_id, mem_id]) => {
            await TagsQueriesUtils.createTag(async (args) => {
                const [user_id, mem_id, tag] = args;

                await db.memes.memesTagsQueries.addMemTag({ tag, mem_id });
                const tags = await db.memes.memesTagsQueries.getMemTags({
                    mem_id,
                });
                expect(tags.length).toBe(1);
                expect(tags[0]).toBe(tag);

                await db.tags.tagsBaseQueries.removeTagFromMemesTags({ tag });
                const deletedTags = await db.memes.memesTagsQueries.getMemTags({
                    mem_id,
                });
                expect(deletedTags.length).toBe(0);
            }, args);
        }, args);
    });
});

test('[TagsBaseQueries] removeTagFromUsersTagsRating', async () => {
    await UsersQueriesUtils.createUser(async (args) => {
        await TagsQueriesUtils.createTag(async (args) => {
            const [user_id, tag] = args;

            await db.users.usersTagsRatingQueries.addUserTagRating({
                user_id,
                tag,
            });
            const userTagRating = await db.users.usersTagsRatingQueries.getUserTagRating(
                { user_id, tag }
            );
            expect(userTagRating).toMatchObject({ user_id, tag, rating: 0 });

            await db.tags.tagsBaseQueries.removeTagFromUsersTagsRating({ tag });
            const deletedUserTagRating = await db.users.usersTagsRatingQueries.getUserTagRating(
                { user_id, tag }
            );
            expect(deletedUserTagRating).toBeNull();
        }, args);
    });
});

afterAll(() => {
    pgp.end();
});
