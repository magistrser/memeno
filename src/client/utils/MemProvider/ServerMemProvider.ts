import Rating from './Rating';
import IMemProvider from './IMemProvider';
import axios from 'axios';
import { SpecialMemes } from './resources-folder-mem-provider/SpecialMemes';
import { MemClient } from '../../../routes/MemClient';
import { Select } from '../../../routes/engine/select';
import DevelopmentProvider from '../../../providers/DevelopmentProvider';
import connectionTracker, { IConnectionTracker } from '../ConnectionTracker';

class ServerMemProvider implements IMemProvider {
    private memes: MemClient[];
    private readonly memesUpdateThreshold: number;
    private isMemesUpdating: boolean;

    private onWait: () => void;
    private onLoad: (currentMem?: MemClient) => void;

    private connectionTracker: IConnectionTracker | null;

    constructor(connectionTracker) {
        this.memes = [];
        this.memesUpdateThreshold = 10;
        this.isMemesUpdating = false;
        this.connectionTracker = connectionTracker;
    }

    init(onWait, onLoad) {
        this.onWait = onWait;
        this.onLoad = onLoad;

        this.onWait();
        this.updateMemes(true);
    }

    private updateMemes(isInit = false) {
        this.isMemesUpdating = true;

        const getTopReq = {
            ignore_memes: this.memes.map((x) => x.mem_id),
        };
        const updateMemesRequest = () =>
            axios[Select.GetTop.Type]<Select.GetTop.Res>(
                Select.GetTop.Rout,
                getTopReq
            );

        (this.connectionTracker
            ? this.connectionTracker.makeRequest(updateMemesRequest)
            : updateMemesRequest()
        )
            .then((res) => {
                this.isMemesUpdating = false;

                if (isInit) {
                    this.memes = res.data;
                    this.onLoad(this.memes[0]);
                    return;
                }

                if (res.data.length === 0 && this.memes.length === 0) {
                    this.memes = res.data;
                    return;
                }

                this.memes = this.memes.concat(res.data);
                this.onLoad();
            })
            .catch((error) => {
                this.isMemesUpdating = false;
            });
    }

    getCurrentMem() {
        if (
            this.memes.length < this.memesUpdateThreshold &&
            !this.isMemesUpdating
        ) {
            this.updateMemes();
        }

        if (this.memes.length == 0) {
            return SpecialMemes.EndMem;
        }

        return this.memes[0];
    }
    swapMem(type: Rating) {
        if (this.memes.length > 0) {
            const updateMemesRequest = () =>
                DevelopmentProvider.memes.rateMem({
                    mem_id: this.memes[0].mem_id,
                    like: type === Rating.Like,
                });

            (this.connectionTracker
                ? this.connectionTracker.makeRequest(updateMemesRequest)
                : updateMemesRequest()
            ).catch((error) => {});

            this.memes.shift();
            return;
        }

        if (!this.isMemesUpdating) {
            this.updateMemes();
        }
    }
}

const folderMemProvider = new ServerMemProvider(connectionTracker);
export default folderMemProvider;
