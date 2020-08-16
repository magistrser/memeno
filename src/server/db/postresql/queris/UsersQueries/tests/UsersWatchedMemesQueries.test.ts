import 'babel-polyfill';

import { db, pgp } from '../../../index';
import { AuthType } from '../../../../IQueries/IUsersQueries/IUsersBaseQueries/AuthType';
import UsersQueriesUtils from './utils';
import MemesQueriesUtils from '../../MemesQueries/tests/utils';
import TagsQueriesUtils from '../../TagsQueries/tests/utils';

test('[UsersWatchedMemesQueries] addUserWatchedMem/getUserWatchedMemIds/removeFromUsersWatchedMemes', async () => {
    await UsersQueriesUtils.createUser(async (args) => {
        await MemesQueriesUtils.createMem(async (args) => {
            await MemesQueriesUtils.createMem(async (args) => {
                const [user_id, mem_id1, mem_id2] = args;

                await db.users.usersWatchedMemesQueries.addUserWatchedMem({
                    user_id,
                    mem_id: mem_id1,
                    like: 0,
                });
                await db.users.usersWatchedMemesQueries.addUserWatchedMem({
                    user_id,
                    mem_id: mem_id2,
                    like: 1,
                });
                const watchedMems = await db.users.usersWatchedMemesQueries.getUserWatchedMemIds(
                    { user_id }
                );
                expect(watchedMems.length).toBe(2);
                expect(watchedMems[0]).toBe(mem_id1);
                expect(watchedMems[1]).toBe(mem_id2);

                await db.users.usersWatchedMemesQueries.removeFromUsersWatchedMemes(
                    {
                        user_id,
                    }
                );
                const deletedWatchedMemes = await db.users.usersWatchedMemesQueries.getUserWatchedMemIds(
                    { user_id }
                );
                expect(deletedWatchedMemes.length).toBe(0);
            }, args);
        }, args);
    });
});

afterAll(() => {
    pgp.end();
});
