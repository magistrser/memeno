import 'babel-polyfill';

import { pgp, db } from '../../../index';
import { AuthType } from '../../../../IQueries/IUsersQueries/IUsersBaseQueries/AuthType';
import UsersQueriesUtils from './utils';

test('[VkUserQueries] addVkUserToVkUsers/getVkUserIfExist/getVkUserByUserId/removeVkUser', async () => {
    await UsersQueriesUtils.createUser(async ([user_id]) => {
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
    });
});

afterAll(() => {
    pgp.end();
});
