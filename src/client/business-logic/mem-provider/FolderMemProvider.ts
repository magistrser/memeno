import Rating from './rating';
import IMemProvider from './iface';
import axios from 'axios';
import { EndMem } from './resources-folder-mem-provider/mems';
import routes from '../../../routes';
import { MemClient } from '../../../api/responses';
import { GetTopRes } from '../../../api/engine/selectMemesEngine/responses';

class FolderMemProvider implements IMemProvider {
    private memes: MemClient[];

    constructor() {
        this.memes = [];
        axios.get<GetTopRes>(routes.server.engine.select.top).then((res) => {
            this.memes = res.data;
        });
    }

    getCurrentMem() {
        if (this.memes.length > 0) {
            return this.memes[0];
        }
        return EndMem;
    }
    getNextMem() {
        if (this.memes.length > 1) {
            return this.memes[1];
        }
        return EndMem;
    }
    swapMem(type: Rating) {
        const mem = this.memes.shift();
        if (mem) {
            this.memes.push(mem);
        }
    }
}

const memProvider = new FolderMemProvider();
export default memProvider;
