import { AuthType } from './AuthType';
import { UserId } from './User';

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

export default interface IUsersBaseQueries {
    createNewUser: (req: CreateNewUser) => Promise<UserId>;
    updateUserRating: (req: UpdateUserRating) => Promise<void>;
    getUser: (req: GetUser) => Promise<User | void>;
    removeUser: (req: RemoveUser) => Promise<void>;
}
