import 'babel-polyfill';

import { db, pgp } from '../../../index';
import UsersQueriesUtils from '../../UsersQueries/tests/utils';
import MemesQueriesUtils from './utils';
import TagsQueriesUtils from '../../TagsQueries/tests/utils';

test('[MemesTagsQueries] addMemTags/getMemTags/removeMemTags', async () => {
    await UsersQueriesUtils.createUser(async (args) => {
        await MemesQueriesUtils.createMem(async ([user_id, mem_id]) => {
            await TagsQueriesUtils.createTag(async (args) => {
                await TagsQueriesUtils.createTag(async (args) => {
                    const [user_id, mem_id, tag1, tag2] = args;

                    await db.memes.memesTagsQueries.addMemTag({
                        tag: tag1,
                        mem_id,
                    });
                    await db.memes.memesTagsQueries.addMemTag({
                        tag: tag1,
                        mem_id,
                    });
                    await db.memes.memesTagsQueries.addMemTag({
                        tag: tag2,
                        mem_id,
                    });

                    const tags = await db.memes.memesTagsQueries.getMemTags({
                        mem_id,
                    });
                    expect(tags.length).toBe(2);
                    expect(tags[0]).toBe(tag1);
                    expect(tags[1]).toBe(tag2);

                    await db.memes.memesTagsQueries.removeMemTags({ mem_id });
                    const deletedTags = await db.memes.memesTagsQueries.getMemTags(
                        { mem_id }
                    );
                    expect(deletedTags.length).toBe(0);
                }, args);
            }, args);
        }, args);
    });
});

afterAll(() => {
    pgp.end();
});
