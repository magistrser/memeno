const routes = {
    react: {
        root: '/',
        login: '/login',
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
