import {
    AddTags,
    RateTags,
    RemoveTags,
} from '../../server/engine/IEngine/ITagsEngine';
import routes from '../routes';
import { RequestType } from '../RequestType';

export namespace Tags {
    export namespace AddTags {
        export type Req = AddTags;
        export type Res = null;
        export const Rout = routes.server.engine.tags.add;
        export const Type = RequestType.post;
    }
    export namespace RateTags {
        export type Req = RateTags;
        export type Res = null;
        export const Rout = routes.server.engine.tags.rate;
        export const Type = RequestType.post;
    }
    export namespace RemoveTags {
        export type Req = RemoveTags;
        export type Res = null;
        export const Rout = routes.server.engine.tags.remove;
        export const Type = RequestType.post;
    }
}
