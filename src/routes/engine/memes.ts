import {
    AddMem,
    RateMem,
    RemoveMem,
} from '../../server/engine/IEngine/IMemesEngine';
import routes from '../routes';
import { RequestType } from '../RequestType';
import { MemId } from '../../server/db/IQueries/IMemesQueries/IMemesBaseQueries/Mem';

export namespace Memes {
    export namespace AddMem {
        export type Req = AddMem;
        export type Res = MemId;
        export const Rout = routes.server.engine.memes.add;
        export const Type = RequestType.post;
    }
    export namespace RateMem {
        export type Req = RateMem;
        export type Res = null;
        export const Rout = routes.server.engine.memes.rate;
        export const Type = RequestType.post;
    }
    export namespace RemoveMem {
        export type Req = RemoveMem;
        export type Res = null;
        export const Rout = routes.server.engine.memes.remove;
        export const Type = RequestType.post;
    }
}
