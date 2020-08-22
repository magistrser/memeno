import IUsersEngine, {
    AddVkUser,
    CreateNewUser,
    GetAccessLevel,
    GetUser,
    GetVkUserByUserId,
    GetVkUserByVkId,
    RateTags,
    RemoveUser,
    SetAccessLevel,
} from '../IEngine/IUsersEngine';
import {
    User,
    UserId,
} from '../../db/IQueries/IUsersQueries/IUsersBaseQueries/User';
import { db } from '../../db/postresql';
import { AuthType } from '../../db/IQueries/IUsersQueries/IUsersBaseQueries/AuthType';
import { VkUser } from '../../db/IQueries/IUsersQueries/IVkUsersQueries/VkUser';
import { AccessLevel } from '../../db/IQueries/IUsersQueries/IUsersBaseQueries/AccessLevel';

const UsersEngine: IUsersEngine = class {
    static addVkUser(req: AddVkUser): Promise<UserId> {
        return db.tx(async (transaction) => {
            const vk_user = await transaction.users.vkUsersQueries.getVkUserByVkId(
                { vk_id: req.vk_id }
            );
            if (vk_user) {
                return vk_user.user_id;
            }

            const user_id = await transaction.users.usersBaseQueries.createNewUser(
                { auth_type: AuthType.vk }
            );
            await transaction.users.vkUsersQueries.addVkUserToVkUsers({
                ...req,
                user_id,
            });

            return user_id;
        });
    }
    static getVkUserByVkId(req: GetVkUserByVkId): Promise<VkUser | null> {
        return db.tx(async (transaction) => {
            return transaction.users.vkUsersQueries.getVkUserByVkId(req);
        });
    }
    static getVkUserByUserId(req: GetVkUserByUserId): Promise<VkUser | null> {
        return db.tx(async (transaction) => {
            return transaction.users.vkUsersQueries.getVkUserByUserId(req);
        });
    }
    static createNewUser(req: CreateNewUser): Promise<UserId> {
        return db.users.usersBaseQueries.createNewUser(req);
    }
    static getUser(req: GetUser): Promise<User | null> {
        return db.users.usersBaseQueries.getUser(req);
    }
    static async rateTags(req: RateTags): Promise<void> {
        const like = req.like ? 1 : 0;
        for (let i = 0; i < req.tags.length; ++i) {
            const tag = { tag: req.tags[i], user_id: req.user_id };
            await db.tags.tagsBaseQueries.addTag(tag);
            await db.users.usersTagsRatingQueries.addUserTagRating(
                tag
            );
            await db.users.usersTagsRatingQueries.updateUserTagRating(
                {
                    ...tag,
                    like,
                }
            );
        }
    }
    static removeUser(req: RemoveUser): Promise<void> {
        return db.tx(async (transaction) => {
            const user = await transaction.users.usersBaseQueries.getUser(req);
            if (user) {
                await transaction.users.usersMemesQueries.removeFromUsersMemes(
                    req
                );
                await transaction.users.usersUsersRatingQueries.removeFromUsersUsersRating(
                    req
                );
                await transaction.users.usersTagsRatingQueries.removeFromUsersTagsRating(
                    req
                );

                switch (user.auth_type) {
                    case AuthType.vk: {
                        const vk_user = await transaction.users.vkUsersQueries.getVkUserByUserId(
                            req
                        );

                        if (vk_user) {
                            await transaction.users.vkUsersQueries.removeVkUser(
                                {
                                    vk_id: vk_user.vk_id,
                                }
                            );
                            await transaction.users.usersBaseQueries.removeUser(
                                req
                            );
                        }
                    }
                }
            }
        });
    }
    static setAccessLevel(req: SetAccessLevel): Promise<null> {
        return db.users.usersBaseQueries.setAccessLevel(req);
    }
    static getAccessLevel(req: GetAccessLevel): Promise<AccessLevel | null> {
        return db.users.usersBaseQueries.getAccessLevel(req);
    }
};

export default UsersEngine;
