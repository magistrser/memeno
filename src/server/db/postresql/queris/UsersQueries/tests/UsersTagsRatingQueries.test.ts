import 'babel-polyfill';

import { db, pgp } from '../../../index';
import UsersQueriesUtils from './utils';
import TagsQueriesUtils from '../../TagsQueries/tests/utils';

test('[UsersTagsRatingQueries] addUserTagRating/getUserTagRating/removeFromUsersTagsRating', async () => {
    await UsersQueriesUtils.createUser(async (args) => {
        await TagsQueriesUtils.createTag(async (args) => {
            const [user_id, tag] = args;

            await db.users.usersTagsRatingQueries.addUserTagRating({
                user_id,
                tag,
            });
            await db.users.usersTagsRatingQueries.addUserTagRating({
                user_id,
                tag,
            });

            const userTagRating = await db.users.usersTagsRatingQueries.getUserTagRating(
                { user_id, tag }
            );
            expect(userTagRating).toMatchObject({ user_id, tag, rating: 0 });

            await db.users.usersTagsRatingQueries.removeFromUsersTagsRating({
                user_id,
            });
            const deletedUserTagRating = await db.users.usersTagsRatingQueries.getUserTagRating(
                { user_id, tag }
            );
            expect(deletedUserTagRating).toBeNull();
        }, args);
    });
});

test('[UsersTagsRatingQueries] updateUserTagRating', async () => {
    await UsersQueriesUtils.createUser(async (args) => {
        await TagsQueriesUtils.createTag(async (args) => {
            const [user_id, tag] = args;

            await db.users.usersTagsRatingQueries.addUserTagRating({
                user_id,
                tag,
            });
            await db.users.usersTagsRatingQueries.updateUserTagRating({
                user_id,
                tag,
                like: 1,
            });
            await db.users.usersTagsRatingQueries.updateUserTagRating({
                user_id,
                tag,
                like: 1,
            });
            await new Promise((resolve) => {
                setTimeout(resolve, 2000);
            });
            await db.users.usersTagsRatingQueries.updateUserTagRating({
                user_id,
                tag,
                like: 0,
            });

            const userTagRating = await db.users.usersTagsRatingQueries.getUserTagRating(
                { user_id, tag }
            );
            expect(userTagRating).not.toBeNull();
            userTagRating ? expect(userTagRating.rating).toBe(1) : null;
            userTagRating
                ? expect(userTagRating.rating_update_time).toBeGreaterThan(
                      userTagRating.last_like_time
                  )
                : null;

            await db.users.usersTagsRatingQueries.removeFromUsersTagsRating({
                user_id,
            });
        }, args);
    });
});

test('[UsersTagsRatingQueries] updateUserTagDynamicRating', async () => {
    await UsersQueriesUtils.createUser(async (args) => {
        await TagsQueriesUtils.createTag(async (args) => {
            const [user_id, tag] = args;
            const modulo_constraint = 2;

            await db.users.usersTagsRatingQueries.addUserTagRating({
                user_id,
                tag,
            });
            for (let i = 0; i < 3; ++i) {
                await db.users.usersTagsRatingQueries.updateUserTagDynamicRating(
                    {
                        user_id,
                        tag,
                        value: 1,
                        modulo_constraint,
                    }
                );
            }

            let userTagRating = await db.users.usersTagsRatingQueries.getUserTagRating(
                { user_id, tag }
            );
            expect(userTagRating).not.toBeNull();
            userTagRating ? expect(userTagRating.dynamic_rating).toBe(2) : null;

            for (let i = 0; i < 10; ++i) {
                await db.users.usersTagsRatingQueries.updateUserTagDynamicRating(
                    {
                        user_id,
                        tag,
                        value: -1,
                        modulo_constraint,
                    }
                );
            }
            userTagRating = await db.users.usersTagsRatingQueries.getUserTagRating(
                { user_id, tag }
            );
            expect(userTagRating).not.toBeNull();
            userTagRating
                ? expect(userTagRating.dynamic_rating).toBe(-2)
                : null;

            await db.users.usersTagsRatingQueries.removeFromUsersTagsRating({
                user_id,
            });
        }, args);
    });
});

afterAll(() => {
    pgp.end();
});
