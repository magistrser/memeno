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

    addVkUserToVkUsers(req: AddVkUserToVkUsers): Promise<null> {
        return this.db.none(
            'INSERT INTO vk_users(vk_id, user_id, email, full_name, photo_url, url) VALUES(${vk_id}, ${user_id}, ${email}, ${full_name}, ${photo_url}, ${url}) ON CONFLICT (vk_id) DO NOTHING',
            {
                ...req,
                email: req.email ? req.email : null,
                full_name: req.full_name ? req.full_name : null,
                photo_url: req.photo_url ? req.photo_url : null,
            }
        );
    }
    getVkUserByVkId(req: GetVkUserByVkId): Promise<VkUser | null> {
        return this.db.oneOrNone(
            'SELECT * FROM vk_users WHERE vk_id = ${vk_id}',
            req
        );
    }
    getVkUserByUserId(req: GetVkUserByUserId): Promise<VkUser | null> {
        return this.db.oneOrNone(
            'SELECT * FROM vk_users WHERE user_id = ${user_id}',
            req
        );
    }
    removeVkUser(req: RemoveVkUser): Promise<null> {
        return this.db.none('DELETE FROM vk_users WHERE vk_id = ${vk_id}', req);
    }
}
