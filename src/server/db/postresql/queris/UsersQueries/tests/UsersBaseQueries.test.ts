import 'babel-polyfill';

import { db, pgp } from '../../../index';
import { AuthType } from '../../../../IQueries/IUsersQueries/IUsersBaseQueries/AuthType';
import UsersQueriesUtils from './utils';
import { AccessLevel } from '../../../../IQueries/IUsersQueries/IUsersBaseQueries/AccessLevel';

test('[UsersBaseQueries] createNewUser/getUser/removeUser', async () => {
    await UsersQueriesUtils.createUser(async ([user_id]) => {
        const user = await db.users.usersBaseQueries.getUser({ user_id });
        expect(user).toMatchObject({
            user_id,
            auth_type: AuthType.vk,
            rating: 0,
        });
        user && expect(typeof user.rating_update_time).toBe('number');
    });
});

test('[UsersBaseQueries] updateUserRating', async () => {
    await UsersQueriesUtils.createUser(async ([user_id]) => {
        await db.users.usersBaseQueries.updateUserRating({ user_id, like: 1 });
        await db.users.usersBaseQueries.updateUserRating({ user_id, like: 1 });
        await db.users.usersBaseQueries.updateUserRating({ user_id, like: 1 });
        await db.users.usersBaseQueries.updateUserRating({ user_id, like: 0 });

        const user = await db.users.usersBaseQueries.getUser({ user_id });
        expect(user).toMatchObject({
            user_id,
            auth_type: AuthType.vk,
            rating: 2,
        });
        user && expect(typeof user.rating_update_time).toBe('number');
    });
});

test('[UsersBaseQueries] updateUserRating', async () => {
    await UsersQueriesUtils.createUser(async ([user_id]) => {
        let accessLevel = await db.users.usersBaseQueries.getAccessLevel({
            user_id,
        });
        expect(accessLevel).toBe(AccessLevel.common);

        await db.users.usersBaseQueries.setAccessLevel({
            user_id,
            access_level: AccessLevel.developer,
        });
        accessLevel = await db.users.usersBaseQueries.getAccessLevel({
            user_id,
        });
        expect(accessLevel).toBe(AccessLevel.developer);
    });
});

afterAll(() => {
    pgp.end();
});
