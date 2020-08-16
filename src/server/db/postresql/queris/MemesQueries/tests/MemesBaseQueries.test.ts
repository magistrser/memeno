import 'babel-polyfill';

import { db, pgp } from '../../../index';
import { AuthType } from '../../../../IQueries/IUsersQueries/IUsersBaseQueries/AuthType';
import UsersQueriesUtils from '../../UsersQueries/tests/utils';
import MemesQueriesUtils from './utils';

test('[MemesBaseQueries] addMem/getMem/removeMem', async () => {
    await UsersQueriesUtils.createUser(async (args) => {
        await MemesQueriesUtils.createMem(async ([user_id, mem_id]) => {
            const mem = await db.memes.memesBaseQueries.getMem({
                mem_id: mem_id,
            });
            expect(mem).toMatchObject({ user_id, mem_id, rating: 0 });
        }, args);
    });
});

test('[MemesBaseQueries] updateMemRating', async () => {
    await UsersQueriesUtils.createUser(async (args) => {
        await MemesQueriesUtils.createMem(async ([user_id, mem_id]) => {
            await db.memes.memesBaseQueries.updateMemRating({
                mem_id,
                like: 0,
            });
            await db.memes.memesBaseQueries.updateMemRating({
                mem_id,
                like: 0,
            });
            await db.memes.memesBaseQueries.updateMemRating({
                mem_id,
                like: 0,
            });
            await db.memes.memesBaseQueries.updateMemRating({
                mem_id,
                like: 1,
            });
        }, args);
    });
});

test('[MemesBaseQueries] removeFromUsersMemes', async () => {
    await UsersQueriesUtils.createUser(async (args) => {
        await MemesQueriesUtils.createMem(async ([user_id, mem_id]) => {
            await db.users.usersMemesQueries.addUserMem({ user_id, mem_id });
            const userMemes = await db.users.usersMemesQueries.getUserMemIds({
                user_id,
            });
            expect(userMemes.length).toBe(1);
            expect(userMemes[0]).toBe(mem_id);

            await db.memes.memesBaseQueries.removeFromUsersMemes({ mem_id });
            const deletedUserMemes = await db.users.usersMemesQueries.getUserMemIds(
                {
                    user_id,
                }
            );
            expect(deletedUserMemes.length).toBe(0);
        }, args);
    });
});

test('[MemesBaseQueries] removeFromUsersWatchedMemes', async () => {
    await UsersQueriesUtils.createUser(async (args) => {
        await MemesQueriesUtils.createMem(async ([user_id, mem_id]) => {
            await db.users.usersWatchedMemesQueries.addUserWatchedMem({
                user_id,
                mem_id,
                like: 0,
            });
            const watchedMemes = await db.users.usersWatchedMemesQueries.getUserWatchedMemIds(
                { user_id }
            );
            expect(watchedMemes.length).toBe(1);
            expect(watchedMemes[0]).toBe(mem_id);

            await db.memes.memesBaseQueries.removeFromUsersWatchedMemes({
                mem_id,
            });
            const deletedWatchedMemes = await db.users.usersWatchedMemesQueries.getUserWatchedMemIds(
                { user_id }
            );
            expect(deletedWatchedMemes.length).toBe(0);
        }, args);
    });
});

afterAll(() => {
    pgp.end();
});
