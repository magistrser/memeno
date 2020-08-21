import routes from '../routes';
import { RequestType } from '../RequestType';

export namespace Auth {
    export namespace IsAuth {
        export type Req = null;
        export type Res = boolean;
        export const Route = routes.server.auth.isAuth;
        export const Type = RequestType.post;
    }
}
