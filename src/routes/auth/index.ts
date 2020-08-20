import routes from "../routes";

export namespace Auth {
    export namespace IsAuth {
        export type Req = void;
        export type Res = boolean;
        export const Route = routes.server.auth.isAuth;
    }
}
