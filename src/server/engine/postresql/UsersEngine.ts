import IUsersEngine, {
    AddVkUser,
    GetVkUserBiUserId,
    GetVkUserBiVkId,
    RateTags,
    RemoveUser
} from "../IEngine/IUsersEngine";
import {UserId} from "../../db/IQueries/IUsersQueries/IUsersBaseQueries/User";
import {db} from "../../db/postresql";
import {AuthType} from "../../db/IQueries/IUsersQueries/IUsersBaseQueries/AuthType";
import {VkUser} from "../../db/IQueries/IUsersQueries/IVkUsersQueries/VkUser";

const UsersEngine: IUsersEngine = class {
    static addVkUser(req: AddVkUser): Promise<UserId> {
        return db.tx( async (transaction) => {
            const vk_user = await transaction.users.vkUsersQueries.getVkUserByVkId({vk_id: req.vk_id});
            if(vk_user) {
                return vk_user.user_id;
            }

            const user_id = await transaction.users.usersBaseQueries.createNewUser({auth_type: AuthType.vk});
            await transaction.users.vkUsersQueries.addVkUserToVkUsers({...req, user_id});

            return user_id;
        });
    }
    static getVkUserByVkId(req: GetVkUserBiVkId): Promise<VkUser> {
        return db.tx( async (transaction) => {
            return transaction.users.vkUsersQueries.getVkUserByVkId(req);
        });
    }
    static getVkUserByUserId(req: GetVkUserBiUserId): Promise<VkUser>{
        return db.tx( async (transaction) => {
            return transaction.users.vkUsersQueries.getVkUserByUserId(req);
        });
    }
    static rateTags(req: RateTags): Promise<void> {
        return db.tx( async (transaction) => {
            const like = req.like ? 1 : 0;
            for(let i = 0; i < req.tags.length; ++i) {
                const tag = {tag: req.tags[i], user_id: req.user_id};
                transaction.users.usersTagsRatingQueries.addUserTagRating(tag);
                transaction.users.usersTagsRatingQueries.updateUserTagRating({...tag, like});
            }
        });
    }
    static removeUser(req: RemoveUser): Promise<void>{
        return db.tx( async (transaction) => {
            const user = await transaction.users.usersBaseQueries.getUser(req);
            if(user) {
                await transaction.users.usersMemesQueries.removeFromUsersMemes(req);
                await transaction.users.usersUsersRatingQueries.removeFromUsersUsersRating(req);
                await transaction.users.usersTagsRatingQueries.removeFromUsersTagsRating(req);

                switch (user.auth_type) {
                    case AuthType.vk: {
                        const vk_user = await transaction.users.vkUsersQueries.getVkUserByUserId(req);
                        await transaction.users.vkUsersQueries.removeVkUser({vk_id: vk_user.vk_id});
                        await transaction.users.usersBaseQueries.removeUser(req);
                    }
                }
            }
        });
    }
}

export default UsersEngine;