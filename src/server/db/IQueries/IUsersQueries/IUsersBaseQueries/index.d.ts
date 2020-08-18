import { AuthType } from './AuthType';
import { User, UserId } from './User';
import { AccessLevel } from './AccessLevel';

export type CreateNewUser = {
    auth_type: AuthType;
};
export type UpdateUserRating = {
    user_id: UserId;
    like: number;
};
export type GetUser = {
    user_id: UserId;
};
export type RemoveUser = {
    user_id: UserId;
};
export type SetAccessLevel = {
    user_id: UserId;
    access_level: AccessLevel;
};
export type GetAccessLevel = {
    user_id: UserId;
};

export default interface IUsersBaseQueries {
    createNewUser(req: CreateNewUser): Promise<UserId>;
    updateUserRating(req: UpdateUserRating): Promise<void>;
    getUser(req: GetUser): Promise<User>;
    removeUser(req: RemoveUser): Promise<void>;
    setAccessLevel(req: SetAccessLevel): Promise<void>;
    getAccessLevel(req: GetAccessLevel): Promise<AccessLevel>;
}
