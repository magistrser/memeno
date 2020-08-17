import fs from 'fs';
import path from 'path';
import { db } from '../server/db/postresql';
import { AuthType } from '../server/db/IQueries/IUsersQueries/IUsersBaseQueries/AuthType';
import MemesEngine from '../server/engine/postresql/MemesEngine';

(async function loadMemesFromFolder() {
    const memesFolder = '../../resources/memesWithTags';
    const tagsExtension = '.tags';

    const absoluteMemesFolder = path.join(__dirname, memesFolder);
    const user_id = await db.users.usersBaseQueries.createNewUser({
        auth_type: AuthType.tech,
    });

    const files = fs
        .readdirSync(absoluteMemesFolder)
        .filter((x) => path.extname(x) !== tagsExtension);
    for (let i = 0; i < files.length; ++i) {
        const file = files[i];
        const name = path.parse(file).name;
        const tagsFileName = name + tagsExtension;
        const mem = fs.readFileSync(path.join(absoluteMemesFolder, file));

        const tagsFile = fs.readFileSync(
            path.join(absoluteMemesFolder, tagsFileName),
            'utf-8'
        );
        const tags = tagsFile.split(/\r?\n/);

        await MemesEngine.addMem({
            user_id,
            data: mem,
            tags,
        });
    }
})();
