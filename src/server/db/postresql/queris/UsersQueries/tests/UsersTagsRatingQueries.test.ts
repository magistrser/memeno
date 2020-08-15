import 'babel-polyfill';

import { db, pgp } from '../../../index';
import { AuthType } from '../../../../IQueries/IUsersQueries/IUsersBaseQueries/AuthType';

test('[UsersTagsRatingQueries] addUserTagRating/getUserTagRating/removeFromUsersTagsRating', async () => {
    const user_id = await db.users.usersBaseQueries.createNewUser({
        auth_type: AuthType.vk,
    });

    const tag = 'pogchamp_UsersTagsRatingQueries1';
    await db.tags.tagsBaseQueries.addTag({ tag });

    await db.users.usersTagsRatingQueries.addUserTagRating({ user_id, tag });
    await db.users.usersTagsRatingQueries.addUserTagRating({ user_id, tag });

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

    await db.tags.tagsBaseQueries.removeTag({ tag });
    await db.users.usersBaseQueries.removeUser({ user_id });
});

test('[UsersTagsRatingQueries] updateUserTagRating', async () => {
    const user_id = await db.users.usersBaseQueries.createNewUser({
        auth_type: AuthType.vk,
    });

    const tag = 'pogchamp_UsersTagsRatingQueries2';
    await db.tags.tagsBaseQueries.addTag({ tag });

    await db.users.usersTagsRatingQueries.addUserTagRating({ user_id, tag });
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
    await db.users.usersTagsRatingQueries.updateUserTagRating({
        user_id,
        tag,
        like: 0,
    });

    const userTagRating = await db.users.usersTagsRatingQueries.getUserTagRating(
        { user_id, tag }
    );
    expect(userTagRating.rating).toBe(1);

    await db.users.usersTagsRatingQueries.removeFromUsersTagsRating({
        user_id,
    });
    await db.tags.tagsBaseQueries.removeTag({ tag });
    await db.users.usersBaseQueries.removeUser({ user_id });
});

afterAll(() => {
    pgp.end();
});
