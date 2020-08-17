import 'babel-polyfill';
import { pgp } from '../../../db/postresql';
import UsersEngine from '../UsersEngine';

test('[UsersEngine] add/remove VK user', async () => {
    const vkUserTemplate = {
        vk_id: Math.floor(Math.random() * 10000000),
        url: 'url',
    };
    const user_id = await UsersEngine.addVkUser(vkUserTemplate);
    const vkUser = await UsersEngine.getVkUserByUserId({ user_id });
    expect(vkUser).toMatchObject(vkUserTemplate);

    await UsersEngine.removeUser({ user_id });
    const deletedVkUser = await UsersEngine.getVkUserByUserId({ user_id });
    expect(deletedVkUser).toBeNull();
});

afterAll(() => {
    pgp.end();
});
