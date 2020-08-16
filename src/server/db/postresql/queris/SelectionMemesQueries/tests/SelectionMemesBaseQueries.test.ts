import 'babel-polyfill';

import UsersQueriesUtils from "../../UsersQueries/tests/utils";
import MemesQueriesUtils from "../../MemesQueries/tests/utils";
import {db, pgp} from "../../../index";
import {UserId} from "../../../../IQueries/IUsersQueries/IUsersBaseQueries/User";

test('[SelectionMemesBaseQueries] getAverageTopRating', async () => {
    await UsersQueriesUtils.createUser(async (args) => {
        await MemesQueriesUtils.createMem(async (args) => {
            await MemesQueriesUtils.createMem(async (args) => {
                await MemesQueriesUtils.createMem(async (args) => {
                    const [user_id, mem_id1, mem_id2, mem_id3] = args;

                    await db.memes.memesBaseQueries.updateMemRating({
                        mem_id: mem_id1,
                        like: 4,
                    });
                    await db.memes.memesBaseQueries.updateMemRating({
                        mem_id: mem_id2,
                        like: 6,
                    });
                    await db.memes.memesBaseQueries.updateMemRating({
                        mem_id: mem_id3,
                        like: 3,
                    });

                    const req = {
                        createdAfterDate: 0,
                        count: 2
                    }
                    const rating = await db.selectMemes.selectionMemesBaseQueries.getAverageTopRating(req);
                    expect(rating).toBe(5);
                }, args);
            }, args);
        }, args);
    });
});

test('[SelectionMemesBaseQueries] getTop', async () => {
    await UsersQueriesUtils.createUser(async (args) => {
        await MemesQueriesUtils.createMem(async (args) => {
            await MemesQueriesUtils.createMem(async (args) => {
                await MemesQueriesUtils.createMem(async (args) => {
                    await MemesQueriesUtils.createMem(async (args) => {
                        const [user_id, mem_id1, mem_id2, mem_id3, mem_id4] = args;

                        await db.memes.memesBaseQueries.updateMemRating({
                            mem_id: mem_id1,
                            like: 4,
                        });
                        await db.memes.memesBaseQueries.updateMemRating({
                            mem_id: mem_id2,
                            like: 6,
                        });
                        await db.memes.memesBaseQueries.updateMemRating({
                            mem_id: mem_id3,
                            like: 3,
                        });
                        await db.memes.memesBaseQueries.updateMemRating({
                            mem_id: mem_id4,
                            like: 7,
                        });

                        await db.users.usersWatchedMemesQueries.addUserWatchedMem({
                            user_id,
                            mem_id: mem_id2,
                            like: 1,
                        });

                        const req = {
                            user_id,
                            ratingBarrier: 3,
                            createdAfterDate: 0,
                            count: 3
                        }
                        const memes = await db.selectMemes.selectionMemesBaseQueries.getTop(req);
                        expect(memes.length).toBe(2);
                        expect(memes[0].mem_id).toBe(mem_id4);
                        expect(memes[1].mem_id).toBe(mem_id1);

                        await db.users.usersWatchedMemesQueries.removeFromUsersWatchedMemes(
                            {
                                user_id,
                            }
                        );
                    }, args);
                }, args);
            }, args);
        }, args);
    });
});

afterAll(() => {
    pgp.end();
});