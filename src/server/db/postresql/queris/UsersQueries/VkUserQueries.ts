import {
    AddVkUserToVkUsers,
    GetVkUserIfExist,
    IVkUsersQueries,
    RemoveVkUser,
} from '../../../IQueries/IUsersQueries/IVkUsersQueries';
import { VkUser } from '../../../IQueries/IUsersQueries/IVkUsersQueries/VkUser';
import { IDatabase } from 'pg-promise';
import { IExtensions } from '../../index';

export default class VkUserQueries implements IVkUsersQueries {
    constructor(private db: IDatabase<IExtensions>) {}

    addVkUserToVkUsers(req: AddVkUserToVkUsers): Promise<void> {
        return new Promise((res, reg) => res());
    }
    getVkUserIfExist(req: GetVkUserIfExist): Promise<VkUser | void> {
        return new Promise((res, reg) => res());
    }
    removeVkUser(req: RemoveVkUser): Promise<void> {
        return new Promise((res, reg) => res());
    }
}
