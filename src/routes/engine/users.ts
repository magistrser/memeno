import {
    AddVkUser,
    CreateNewUser,
    GetVkUserByVkId,
    GetVkUserByUserId,
    GetUser,
    RateTags,
    RemoveUser,
    SetAccessLevel,
    GetAccessLevel,
} from '../../server/engine/IEngine/IUsersEngine';
import { VkUser } from '../../server/db/IQueries/IUsersQueries/IVkUsersQueries/VkUser';
import { User } from '../../server/db/IQueries/IUsersQueries/IUsersBaseQueries/User';
import { AccessLevel } from '../../server/db/IQueries/IUsersQueries/IUsersBaseQueries/AccessLevel';
import routes from '../routes';
import { RequestType } from '../RequestType';

export namespace Users {
    export namespace CreateNewUser {
        export type Req = CreateNewUser;
        export type Res = number;
        export const Rout = routes.server.engine.users.create;
        export const Type = RequestType.post;
    }
    export namespace AddVkUser {
        export type Req = AddVkUser;
        export type Res = null;
        export const Rout = routes.server.engine.users.addVk;
        export const Type = RequestType.post;
    }
    export namespace GetVkUserByUserId {
        export type Req = GetVkUserByUserId;
        export type Res = VkUser | null;
        export const Rout = routes.server.engine.users.getVkByUserId;
        export const Type = RequestType.post;
    }
    export namespace GetVkUserByVkId {
        export type Req = GetVkUserByVkId;
        export type Res = VkUser | null;
        export const Rout = routes.server.engine.users.getVkByVkId;
        export const Type = RequestType.post;
    }
    export namespace GetUser {
        export type Req = GetUser;
        export type Res = User | null;
        export const Rout = routes.server.engine.users.get;
        export const Type = RequestType.post;
    }
    export namespace RateTags {
        export type Req = RateTags;
        export type Res = null;
        export const Rout = routes.server.engine.users.rateTags;
        export const Type = RequestType.post;
    }
    export namespace RemoveUser {
        export type Req = RemoveUser;
        export type Res = null;
        export const Rout = routes.server.engine.users.remove;
        export const Type = RequestType.post;
    }
    export namespace SetAccessLevel {
        export type Req = SetAccessLevel;
        export type Res = null;
        export const Rout = routes.server.engine.users.setAccessLevel;
        export const Type = RequestType.post;
    }
    export namespace GetAccessLevel {
        export type Req = GetAccessLevel;
        export type Res = AccessLevel | null;
        export const Rout = routes.server.engine.users.getAccessLevel;
        export const Type = RequestType.post;
    }
}
