/**
 * Passport configuration goes here
 */

import config from '../config';
import routes from "../routes";
import { Strategy as VKontakteStrategy } from 'passport-vkontakte';

type User = {
    id: string;
    email: string;
    fullName: string;
    photoUrl: string;
    vkProfileUrl: string;
};

const DBStub = (() => {
    const users: User[] = [];
    const getUserById = (id) => {
        return users.find((user) => user.id === id);
    };
    const insertUser = (user) => {
        users.push(user);
    };

    return {
        getUserById,
        insertUser,
    };
})();

export default (passport) => {
    passport.use(
        new VKontakteStrategy(
            // options
            {
                clientID: config.vk.appID,
                clientSecret: config.vk.secretKey,
                callbackURL: `${config.server.address}/${routes.server.auth.vk.callback}`,
                scope: ['email', 'photos'],
                profileFields: ['email'],
            },
            // verify
            async (accessToken, refreshToken, params, profile, done) => {
                console.log('VkontakteStrategy middleware triggered...');

                // TODO: Probably we should verify token

                try {
                    let user = await DBStub.getUserById(profile.id);
                    if (!user) {
                        // User does not exist
                        user = {
                            id: profile.id,
                            email: params.email,
                            fullName: profile.displayName,
                            photoUrl: profile.photos[0].value, // Save img url from vk storage for now
                            vkProfileUrl: profile.profileUrl,
                        };
                        DBStub.insertUser(user);
                    }
                    return done(null, user);
                } catch (err) {
                    return done(err);
                }
            }
        )
    );
    /* To support persistent login sessions, Passport needs to be able to
     * serialize users into and deserialize users out of the session.  Typically,
     * this will be as simple as storing the user ID when serializing, and finding
     * the user by ID when deserializing.
     */
    passport.serializeUser((user, done) => {
        done(null, user.id); // second arg is what is in req.session.user
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await DBStub.getUserById(id);
            return done(null, user ? user : false); // second arg here is what is in req.user
        } catch (err) {
            return done(err);
        }
    });
};
