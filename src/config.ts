const serverIp = 'localhost';
const serverPort = 8050;

const dbIp = 'localhost';
const dpPort = 5432;

export default {
    requestType: 'http://',
    db: {
        ip: dbIp,
        port: dpPort,
        address: `${dbIp}:${dpPort}`,
    },
    server: {
        ip: serverIp,
        port: serverPort,
        address: `${serverIp}:${serverPort}`,
    },
    vk: {
        appID: 6907668,
        secretKey: 'zf6g1HUZdbqJCzbqtq0N',
        serviceKey:
            'd0b6e160d0b6e160d0b6e1603fd0df8674dd0b6d0b6e1608c2d2494457e039bf3d23839',
    },
};
