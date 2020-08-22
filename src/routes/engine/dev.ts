import {
    DropUserUsersRating,
    DropUserWatchedMemes,
    SetUserUserRating,
    SetUserTagRating,
    DropUserTagsRating,
    SetMemRating,
    SetUserRating,
} from '../../server/db/IQueries/IDevQueries/IDevBaseQueries';
import routes from '../routes';
import { RequestType } from '../RequestType';

export namespace Dev {
    export namespace DropUserWatchedMemes {
        export type Req = DropUserWatchedMemes;
        export type Res = null;
        export const Rout = routes.server.engine.dev.dropUserWatchedMemes;
        export const Type = RequestType.post;
    }
    export namespace SetUserUserRating {
        export type Req = SetUserUserRating;
        export type Res = null;
        export const Rout = routes.server.engine.dev.setUserUserRating;
        export const Type = RequestType.post;
    }
    export namespace DropUserUsersRating {
        export type Req = DropUserUsersRating;
        export type Res = null;
        export const Rout = routes.server.engine.dev.dropUserUsersRating;
        export const Type = RequestType.post;
    }
    export namespace SetUserTagRating {
        export type Req = SetUserTagRating;
        export type Res = null;
        export const Rout = routes.server.engine.dev.setUserTagRating;
        export const Type = RequestType.post;
    }
    export namespace DropUserTagsRating {
        export type Req = DropUserTagsRating;
        export type Res = null;
        export const Rout = routes.server.engine.dev.dropUserTagsRating;
        export const Type = RequestType.post;
    }
    export namespace SetMemRating {
        export type Req = SetMemRating;
        export type Res = null;
        export const Rout = routes.server.engine.dev.setMemRating;
        export const Type = RequestType.post;
    }
    export namespace SetUserRating {
        export type Req = SetUserRating;
        export type Res = null;
        export const Rout = routes.server.engine.dev.setUserRating;
        export const Type = RequestType.post;
    }
    export namespace GetMyId {
        export type Req = void;
        export type Res = number;
        export const Rout = routes.server.engine.dev.getMyId;
        export const Type = RequestType.post;
    }
    export namespace CleanDb {
        export type Req = void;
        export type Res = void;
        export const Rout = routes.server.engine.dev.cleanDB;
        export const Type = RequestType.post;
    }
}
