import { MemClient } from '../MemClient';
import routes from '../routes';
import { RequestType } from '../RequestType';
import { GetTop } from '../../server/engine/IEngine/ISelectMemesEngine';
import { MemId } from '../../server/db/IQueries/IMemesQueries/IMemesBaseQueries/Mem';

export namespace Select {
    export namespace GetAverage {
        export type Req = null;
        export type Res = number;
        export const Rout = routes.server.engine.select.average;
        export const Type = RequestType.post;
    }
    export type GetTopReq = {
        ignore_memes: MemId[];
    };
    export namespace GetTop {
        export type Req = GetTopReq;
        export type Res = MemClient[];
        export const Rout = routes.server.engine.select.top;
        export const Type = RequestType.post;
    }
}
