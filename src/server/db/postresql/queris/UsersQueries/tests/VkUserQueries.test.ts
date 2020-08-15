import 'babel-polyfill';

import { pgp, db } from '../../../index';
import { AuthType } from '../../../../IQueries/IUsersQueries/IUsersBaseQueries/AuthType';

test('[VkUserQueries] addVkUserToVkUsers/getVkUserIfExist/getVkUserByUserId/removeVkUser', async () => {
    const user_id = await db.users.usersBaseQueries.createNewUser({
        auth_type: AuthType.vk,
    });

    const vk_id = 1234567890;
    const vkUserTemplate = {
        vk_id,
        user_id,
        url: 'url',
        full_name: 'II',
    };
    await db.users.vkUsersQueries.addVkUserToVkUsers(vkUserTemplate);
    await db.users.vkUsersQueries.addVkUserToVkUsers(vkUserTemplate);

    const vkUserByVkId = await db.users.vkUsersQueries.getVkUserByVkId({
        vk_id,
    });
    console.log(vkUserByVkId);
    expect(vkUserByVkId).toMatchObject(vkUserTemplate);

    const vkUserByUserId = await db.users.vkUsersQueries.getVkUserByUserId({
        user_id,
    });
    expect(vkUserByUserId).toMatchObject(vkUserTemplate);

    await db.users.vkUsersQueries.removeVkUser({ vk_id });
    const deletedVkUserByUserId = await db.users.vkUsersQueries.getVkUserByUserId(
        { user_id }
    );
    expect(deletedVkUserByUserId).toBeNull();

    await db.users.usersBaseQueries.removeUser({ user_id });
});

afterAll(() => {
    pgp.end();
});
