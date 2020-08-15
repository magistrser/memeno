import 'babel-polyfill';

import { pgp, db } from '../../../index';
import { AuthType } from '../../../../IQueries/IUsersQueries/IUsersBaseQueries/AuthType';

test('[UsersBaseQueries] createNewUser/getUser/removeUser', async () => {
    const user_id = await db.users.usersBaseQueries.createNewUser({
        auth_type: AuthType.vk,
    });
    expect(typeof user_id).toBe('number');

    const user = await db.users.usersBaseQueries.getUser({ user_id });
    expect(user).toMatchObject({ user_id, auth_type: AuthType.vk, rating: 0 });
    user && expect(typeof user.rating_update_time).toBe('number');

    await db.users.usersBaseQueries.removeUser({ user_id });
    const deleted_user = await db.users.usersBaseQueries.getUser({ user_id });
    expect(deleted_user).toBeNull();
});

test('[UsersBaseQueries] updateUserRating', async () => {
    const user_id = await db.users.usersBaseQueries.createNewUser({
        auth_type: AuthType.vk,
    });
    expect(typeof user_id).toBe('number');

    await db.users.usersBaseQueries.updateUserRating({ user_id, like: 1 });
    await db.users.usersBaseQueries.updateUserRating({ user_id, like: 1 });
    await db.users.usersBaseQueries.updateUserRating({ user_id, like: 1 });
    await db.users.usersBaseQueries.updateUserRating({ user_id, like: 0 });

    const user = await db.users.usersBaseQueries.getUser({ user_id });
    expect(user).toMatchObject({ user_id, auth_type: AuthType.vk, rating: 2 });
    user && expect(typeof user.rating_update_time).toBe('number');

    await db.users.usersBaseQueries.removeUser({ user_id });
    const deleted_user = await db.users.usersBaseQueries.getUser({ user_id });
    expect(deleted_user).toBeNull();
});

afterAll(() => {
    pgp.end();
});
