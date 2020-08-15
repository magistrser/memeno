import { LoginResult } from './LoginResult';

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
    },
};

export default routes;
