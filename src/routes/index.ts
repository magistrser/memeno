import { LoginResult } from './LoginResult';
import {
    DropUserTagsRating,
    DropUserUsersRating,
    DropUserWatchedMemes,
    SetMemRating,
    SetUserRating,
    SetUserTagRating,
    SetUserUserRating,
} from '../server/db/IQueries/IDevQueries/IDevBaseQueries';

const routes = {
    root: '/',
    login: '/login/:fail',
    waiting: '/waiting',
    react: {
        root: '/',
        waiting: '/waiting',
        login: {
            noFail: `/login/${LoginResult.noFail}`,
            fail: `/login/${LoginResult.fail}`,
            serverErrorResponse: `/login/${LoginResult.serverErrorResponse}`,
        },
    },
    server: {
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
