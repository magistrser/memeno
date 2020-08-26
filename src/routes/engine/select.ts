import { MemClient } from '../MemClient';
import routes from '../routes';
import { RequestType } from '../RequestType';
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
    export namespace GetSmartTop {
        export type Req = GetTopReq;
        export type Res = MemClient[];
        export const Rout = routes.server.engine.select.smartTop;
        export const Type = RequestType.post;
    }
}
