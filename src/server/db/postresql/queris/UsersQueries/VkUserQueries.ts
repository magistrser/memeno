import {
    AddVkUserToVkUsers,
    GetVkUserByUserId,
    GetVkUserByVkId,
    IVkUsersQueries,
    RemoveVkUser,
} from '../../../IQueries/IUsersQueries/IVkUsersQueries';
import { VkUser } from '../../../IQueries/IUsersQueries/IVkUsersQueries/VkUser';
import { IDatabase } from 'pg-promise';
import { IExtensions } from '../../index';

export default class VkUserQueries implements IVkUsersQueries {
    constructor(private db: IDatabase<IExtensions>) {}

    addVkUserToVkUsers(req: AddVkUserToVkUsers): Promise<void> {
        return this.db.none(
            'INSERT INTO vk_users(vk_id, user_id, email, full_name, photo_url, url) VALUES($1, $2, $3, $4, $5, $6) ON CONFLICT (vk_id) DO NOTHING',
            [
                req.vk_id,
                req.user_id,
                req.email,
                req.full_name,
                req.photo_url,
                req.url,
                new Date().getTime(),
            ]
        );
    }
    getVkUserByVkId(req: GetVkUserByVkId): Promise<VkUser> {
        return this.db.oneOrNone('SELECT * FROM vk_users WHERE vk_id = $1', [
            req.vk_id,
        ]);
    }
    getVkUserByUserId(req: GetVkUserByUserId): Promise<VkUser> {
        return this.db.oneOrNone('SELECT * FROM vk_users WHERE user_id = $1', [
            req.user_id,
        ]);
    }
    removeVkUser(req: RemoveVkUser): Promise<void> {
        return this.db.none('DELETE FROM vk_users WHERE vk_id = $1', [
            req.vk_id,
        ]);
    }
}
