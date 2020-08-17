import Rating from './rating';
import IMemProvider from './IMemProvider';
import axios from 'axios';
import { EndMem } from './resources-folder-mem-provider/mems';
import routes from '../../../routes';
import { MemClient } from '../../../api/responses';
import { GetTopRes } from '../../../api/engine/selectMemesEngine/responses';

class ServerMemProvider implements IMemProvider {
    private memes: MemClient[];
    private readonly memesUpdateThreshold: number;
    private isMemesUpdating: boolean;

    private onWait: () => void;
    private onLoad: (currentMem?: MemClient) => void;

    constructor() {
        this.memes = [];
        this.memesUpdateThreshold = 10;
        this.isMemesUpdating = false;
    }

    init(onWait, onLoad) {
        this.onWait = onWait;
        this.onLoad = onLoad;

        this.onWait();
        this.updateMemes(true);
    }

    private updateMemes(isInit = false) {
        this.isMemesUpdating = true;
        axios.get<GetTopRes>(routes.server.engine.select.top).then((res) => {
            this.isMemesUpdating = false;
            console.log(routes.server.engine.select.top);

            if(isInit) {
                this.memes = res.data;
                this.onLoad(this.memes[0]);
                return;
            }

            if(res.data.length === 0 && this.memes.length === 0) {
                this.memes = res.data;
                return;
            }

            this.memes = this.memes.concat(res.data);
            this.onLoad();
        }).catch(() => {
            this.isMemesUpdating = false;
        });
    }

    getCurrentMem() {
        if(this.memes.length < this.memesUpdateThreshold && !this.isMemesUpdating) {
            this.updateMemes();
        }

        if (this.memes.length == 0) {
            return EndMem;
        }

        return this.memes[0];
    }
    swapMem(type: Rating) {
        if(this.memes.length > 0) {
            this.memes.shift();
            return;
        }

        if(!this.isMemesUpdating) {
            this.updateMemes();
        }
    }
}

const folderMemProvider = new ServerMemProvider();
export default folderMemProvider;