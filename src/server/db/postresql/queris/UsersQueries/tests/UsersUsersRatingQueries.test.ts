import 'babel-polyfill';

import { pgp, db } from '../../../index';
import { AuthType } from '../../../../IQueries/IUsersQueries/IUsersBaseQueries/AuthType';

test('[UsersUsersRatingQueries] addUserUserRating/getUserUserRating/removeFromUsersUsersRating', async () => {
    const user_id1 = await db.users.usersBaseQueries.createNewUser({
        auth_type: AuthType.vk,
    });
    const user_id2 = await db.users.usersBaseQueries.createNewUser({
        auth_type: AuthType.vk,
    });

    await db.users.usersUsersRatingQueries.addUserUserRating({
        user_id: user_id1,
        second_user_id: user_id2,
    });
    await db.users.usersUsersRatingQueries.addUserUserRating({
        user_id: user_id1,
        second_user_id: user_id2,
    });
    await db.users.usersUsersRatingQueries.addUserUserRating({
        user_id: user_id2,
        second_user_id: user_id1,
    });

    const userRating12 = await db.users.usersUsersRatingQueries.getUserUserRating(
        { user_id: user_id1, second_user_id: user_id2 }
    );
    expect(userRating12).not.toBeNull();
    const userRating21 = await db.users.usersUsersRatingQueries.getUserUserRating(
        { user_id: user_id2, second_user_id: user_id1 }
    );
    expect(userRating21).not.toBeNull();

    await db.users.usersUsersRatingQueries.removeFromUsersUsersRating({
        user_id: user_id1,
    });

    const deletedUserRating12 = await db.users.usersUsersRatingQueries.getUserUserRating(
        { user_id: user_id1, second_user_id: user_id2 }
    );
    expect(deletedUserRating12).toBeNull();
    const deletedUserRating21 = await db.users.usersUsersRatingQueries.getUserUserRating(
        { user_id: user_id2, second_user_id: user_id1 }
    );
    expect(deletedUserRating21).toBeNull();

    await db.users.usersBaseQueries.removeUser({ user_id: user_id1 });
    await db.users.usersBaseQueries.removeUser({ user_id: user_id2 });
});

test('[UsersUsersRatingQueries] updateUserUserRating', async () => {
    const user_id1 = await db.users.usersBaseQueries.createNewUser({
        auth_type: AuthType.vk,
    });
    const user_id2 = await db.users.usersBaseQueries.createNewUser({
        auth_type: AuthType.vk,
    });

    await db.users.usersUsersRatingQueries.addUserUserRating({
        user_id: user_id1,
        second_user_id: user_id2,
    });
    await db.users.usersUsersRatingQueries.addUserUserRating({
        user_id: user_id2,
        second_user_id: user_id1,
    });

    await db.users.usersUsersRatingQueries.updateUserUserRating({
        user_id: user_id1,
        second_user_id: user_id2,
        like: 1,
    });
    await db.users.usersUsersRatingQueries.updateUserUserRating({
        user_id: user_id1,
        second_user_id: user_id2,
        like: 1,
    });
    await db.users.usersUsersRatingQueries.updateUserUserRating({
        user_id: user_id1,
        second_user_id: user_id2,
        like: 0,
    });

    await db.users.usersUsersRatingQueries.updateUserUserRating({
        user_id: user_id2,
        second_user_id: user_id1,
        like: 1,
    });
    await db.users.usersUsersRatingQueries.updateUserUserRating({
        user_id: user_id2,
        second_user_id: user_id1,
        like: 1,
    });

    const userRating12 = await db.users.usersUsersRatingQueries.getUserUserRating(
        { user_id: user_id1, second_user_id: user_id2 }
    );
    expect(userRating12.rating).toBe(1);
    const userRating21 = await db.users.usersUsersRatingQueries.getUserUserRating(
        { user_id: user_id2, second_user_id: user_id1 }
    );
    expect(userRating21.rating).toBe(2);

    await db.users.usersUsersRatingQueries.removeFromUsersUsersRating({
        user_id: user_id1,
    });

    await db.users.usersBaseQueries.removeUser({ user_id: user_id1 });
    await db.users.usersBaseQueries.removeUser({ user_id: user_id2 });
});

afterAll(() => {
    pgp.end();
});
