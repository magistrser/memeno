import { MemClient } from '../MemClient';
import routes from '../routes';
import { RequestType } from '../RequestType';
import { GetTop } from '../../server/engine/IEngine/ISelectMemesEngine';

export namespace Select {
    export namespace GetAverage {
        export type Req = void;
        export type Res = number;
        export const Rout = routes.server.engine.select.average;
        export const Type = RequestType.get;
    }
    export namespace GetTop {
        export type Req = GetTop;
        export type Res = MemClient[];
        export const Rout = routes.server.engine.select.top;
        export const Type = RequestType.get;
    }
}
