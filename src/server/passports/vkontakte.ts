import config from '../../config';
import routes from '../../routes/routes';
import { Strategy as VKontakteStrategy } from 'passport-vkontakte';
import UsersEngine from '../engine/postresql/UsersEngine';

export default (passport) => {
    passport.use(
        new VKontakteStrategy(
            {
                clientID: config.vk.appID,
                clientSecret: config.vk.secretKey,
                callbackURL: `${config.requestType}${config.server.address}${routes.server.auth.vk.callback}`,
                scope: ['email', 'photos'],
                profileFields: ['email'],
            },
            async (accessToken, refreshToken, params, profile, done) => {
                try {
                    let vkUser = await UsersEngine.getVkUserByVkId({
                        vk_id: profile.id,
                    });
                    if (!vkUser) {
                        const AddVkUserReq = {
                            vk_id: profile.id,
                            email: params.email,
                            full_name: profile.displayName,
                            photo_url: profile.photos[0].value,
                            url: profile.profileUrl,
                        };
                        const user_id = await UsersEngine.addVkUser(
                            AddVkUserReq
                        );
                        vkUser = await UsersEngine.getVkUserByUserId({
                            user_id,
                        });
                    }

                    if (!vkUser) {
                        throw new Error('Failed to create VK user');
                    }

                    const user = await UsersEngine.getUser({
                        user_id: vkUser.user_id,
                    });

                    return done(null, user);
                } catch (err) {
                    return done(err);
                }
            }
        )
    );

    passport.serializeUser((user, done) => {
        done(null, user.user_id);
    });

    passport.deserializeUser(async (user_id, done) => {
        try {
            const user = await UsersEngine.getUser({ user_id });
            return done(null, user ? user : false);
        } catch (err) {
            return done(err);
        }
    });
};
