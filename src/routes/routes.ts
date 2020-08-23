import { LoginResult } from './LoginResult';
import { MenuCategory } from './development/MenuCategory';

const routes = {
    root: '/',
    login: '/login/:fail',
    waiting: '/waiting',
    error: '/error',
    memes: '/memes',
    development: {
        root: '/development',
        login: '/development/login/:fail',
        main: '/development/main/:menu',
    },
    react: {
        root: '/',
        waiting: '/waiting',
        login: {
            noFail: `/login/${LoginResult.noFail}`,
            fail: `/login/${LoginResult.fail}`,
            serverErrorResponse: `/login/${LoginResult.serverErrorResponse}`,
        },
        development: {
            main: {
                users: `/development/main/${MenuCategory.Users}`,
                memes: `/development/main/${MenuCategory.Memes}`,
                dev: `/development/main/${MenuCategory.Dev}`,
            },
            login: {
                noFail: `/development/login/${LoginResult.noFail}`,
                fail: `/development/login/${LoginResult.fail}`,
                serverErrorResponse: `/development/login/${LoginResult.serverErrorResponse}`,
            },
        },
    },
    server: {
        development: {
            auth: {
                success: '/development/api/auth/success',
                vk: {
                    login: '/development/api/auth/vk/login',
                },
            },
        },
        auth: {
            success: '/api/auth/success',
            fail: '/api/auth/fail',
            isAuth: '/api/auth/is-auth',
            vk: {
                login: '/api/auth/vk/login',
                callback: '/api/auth/vk/vk-callback',
            },
        },
        engine: {
            dev: {
                dropUserWatchedMemes: '/api/engine/dev/drop-user-watched-memes',
                setUserUserRating: '/api/engine/dev/set-user-user-rating',
                dropUserUsersRating: '/api/engine/dev/drop-user-users-rating',
                setUserTagRating: '/api/engine/dev/set-user-tag-rating',
                dropUserTagsRating: '/api/engine/dev/drop-user-tags-rating',
                setMemRating: '/api/engine/dev/set-mem-rating',
                setUserRating: '/api/engine/dev/set-user-rating',
                getMyId: '/api/engine/dev/get-my-id',
                cleanDB: '/api/engine/dev/clean-db',
            },
            users: {
                create: '/api/engine/users/create',
                addVk: '/api/engine/users/add-vk',
                getVkByVkId: '/api/engine/users/get-vk-by-vk-id',
                getVkByUserId: '/api/engine/users/get-vk-by-user-id',
                get: '/api/engine/users/get',
                rateTags: '/api/engine/users/rate-tags',
                remove: '/api/engine/users/remove',
                setAccessLevel: '/api/engine/users/set-access-level',
                getAccessLevel: '/api/engine/users/get-access-level',
            },
            memes: {
                add: '/api/engine/mem/add',
                remove: '/api/engine/mem/remove',
                rate: '/api/engine/mem/rate',
            },
            select: {
                average: '/api/engine/select/average',
                top: '/api/engine/select/top',
            },
            tags: {
                add: '/api/engine/tags/add',
                rate: '/api/engine/tags/rate',
                remove: '/api/engine/tags/remove',
            },
        },
    },
};

export default routes;
