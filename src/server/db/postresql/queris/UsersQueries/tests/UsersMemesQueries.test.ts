import 'babel-polyfill';

import { db, pgp } from '../../../index';
import UsersQueriesUtils from './utils';
import MemesQueriesUtils from '../../MemesQueries/tests/utils';

test('[UsersMemesQueries] addUserMem/getUserMemIds/removeFromUsersMemes', async () => {
    await UsersQueriesUtils.createUser(async (args) => {
        await MemesQueriesUtils.createMem(async (args) => {
            await MemesQueriesUtils.createMem(async (args) => {
                const [user_id, mem_id_1, mem_id_2] = args;

                await db.users.usersMemesQueries.addUserMem({
                    user_id,
                    mem_id: mem_id_1,
                });
                await db.users.usersMemesQueries.addUserMem({
                    user_id,
                    mem_id: mem_id_2,
                });

                const userMemes = await db.users.usersMemesQueries.getUserMemIds(
                    {
                        user_id,
                    }
                );
                expect(userMemes.length).toBe(2);
                expect(userMemes[0]).toBe(mem_id_1);
                expect(userMemes[1]).toBe(mem_id_2);

                await db.users.usersMemesQueries.removeFromUsersMemes({
                    user_id,
                });
                const deletedUserMemes = await db.users.usersMemesQueries.getUserMemIds(
                    {
                        user_id,
                    }
                );
                expect(deletedUserMemes.length).toBe(0);
            }, args);
        }, args);
    });
});

afterAll(() => {
    pgp.end();
});
