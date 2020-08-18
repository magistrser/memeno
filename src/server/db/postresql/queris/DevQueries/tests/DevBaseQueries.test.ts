import 'babel-polyfill';

import UsersQueriesUtils from '../../UsersQueries/tests/utils';
import MemesQueriesUtils from '../../MemesQueries/tests/utils';
import { db, pgp } from '../../../index';
import TagsQueriesUtils from '../../TagsQueries/tests/utils';

test('[DevBaseQueries] dropUserWatchedMemes', async () => {
    await UsersQueriesUtils.createUser(async (args) => {
        await MemesQueriesUtils.createMem(async ([user_id, mem_id]) => {
            await db.users.usersWatchedMemesQueries.addUserWatchedMem({
                user_id,
                mem_id,
                like: 1,
            });
            let watchedMemes = await db.users.usersWatchedMemesQueries.getUserWatchedMemIds(
                { user_id }
            );
            expect(watchedMemes[0]).toBe(mem_id);

            await db.dev.devBaseQueries.dropUserWatchedMemes({ user_id });
            watchedMemes = await db.users.usersWatchedMemesQueries.getUserWatchedMemIds(
                { user_id }
            );
            expect(watchedMemes.length).toBe(0);
        }, args);
    });
});

test('[DevBaseQueries] setUserUserRating', async () => {
    await UsersQueriesUtils.createUser(async (args) => {
        await UsersQueriesUtils.createUser(
            async ([user_id, second_user_id]) => {
                await db.users.usersUsersRatingQueries.addUserUserRating({
                    user_id,
                    second_user_id,
                });
                await db.dev.devBaseQueries.setUserUserRating({
                    user_id,
                    second_user_id,
                    rating: 10,
                });

                const rating = await db.users.usersUsersRatingQueries.getUserUserRating(
                    { user_id, second_user_id }
                );
                expect(rating.rating).toBe(10);

                await db.users.usersUsersRatingQueries.removeFromUsersUsersRating(
                    { user_id }
                );
            },
            args
        );
    });
});

test('[DevBaseQueries] dropUserUsersRating', async () => {
    await UsersQueriesUtils.createUser(async (args) => {
        await UsersQueriesUtils.createUser(
            async ([user_id, second_user_id]) => {
                await db.users.usersUsersRatingQueries.addUserUserRating({
                    user_id,
                    second_user_id,
                });
                await db.dev.devBaseQueries.setUserUserRating({
                    user_id,
                    second_user_id,
                    rating: 10,
                });

                let rating = await db.users.usersUsersRatingQueries.getUserUserRating(
                    { user_id, second_user_id }
                );
                expect(rating.rating).toBe(10);

                await db.dev.devBaseQueries.dropUserUsersRating({ user_id });
                rating = await db.users.usersUsersRatingQueries.getUserUserRating(
                    { user_id, second_user_id }
                );
                expect(rating.rating).toBe(0);

                await db.users.usersUsersRatingQueries.removeFromUsersUsersRating(
                    { user_id }
                );
            },
            args
        );
    });
});

test('[DevBaseQueries] setUserTagRating', async () => {
    await UsersQueriesUtils.createUser(async (args) => {
        await TagsQueriesUtils.createTag(async ([user_id, tag]) => {
            await db.users.usersTagsRatingQueries.addUserTagRating({
                user_id,
                tag,
            });
            await db.dev.devBaseQueries.setUserTagRating({
                user_id,
                tag,
                rating: 10,
            });

            const rating = await db.users.usersTagsRatingQueries.getUserTagRating(
                { user_id, tag }
            );
            expect(rating.rating).toBe(10);

            await db.users.usersTagsRatingQueries.removeFromUsersTagsRating({
                user_id,
            });
        }, args);
    });
});

test('[DevBaseQueries] dropUserTagsRating', async () => {
    await UsersQueriesUtils.createUser(async (args) => {
        await TagsQueriesUtils.createTag(async ([user_id, tag]) => {
            await db.users.usersTagsRatingQueries.addUserTagRating({
                user_id,
                tag,
            });
            await db.dev.devBaseQueries.setUserTagRating({
                user_id,
                tag,
                rating: 10,
            });

            let rating = await db.users.usersTagsRatingQueries.getUserTagRating(
                { user_id, tag }
            );
            expect(rating.rating).toBe(10);

            await db.dev.devBaseQueries.dropUserTagsRating({ user_id });
            rating = await db.users.usersTagsRatingQueries.getUserTagRating({
                user_id,
                tag,
            });
            expect(rating.rating).toBe(0);

            await db.users.usersTagsRatingQueries.removeFromUsersTagsRating({
                user_id,
            });
        }, args);
    });
});

test('[DevBaseQueries] setMemRating', async () => {
    await UsersQueriesUtils.createUser(async (args) => {
        await MemesQueriesUtils.createMem(async ([user_id, mem_id]) => {
            await db.dev.devBaseQueries.setMemRating({ mem_id, rating: 10 });
            const rating = await db.memes.memesBaseQueries.getMem({ mem_id });
            expect(rating.rating).toBe(10);
        }, args);
    });
});

test('[DevBaseQueries] setUserRating', async () => {
    await UsersQueriesUtils.createUser(async ([user_id]) => {
        await db.dev.devBaseQueries.setUserRating({ user_id, rating: 10 });
        const rating = await db.users.usersBaseQueries.getUser({ user_id });
        expect(rating.rating).toBe(10);
    });
});

afterAll(() => {
    pgp.end();
});
