const serverIp = process.env.SERVER_ADDRESS || 'localhost';
const serverPort = process.env.SERVER_PORT || 8050;

const dbUser = 'postgres';
const dbPassword = 'mysecretpassword';
const dbName = 'memeno';
const dbIp = process.env.POSTGRESQL_ADDRESS || '0.0.0.0';
const dpPort = process.env.POSTGRESQL_PORT || 5432;

const mongoUser = 'memeno';
const mongoPassword = 'mysecretpassword'; // TODO: Generate password
const mongoIp = process.env.MONGODB_ADDRESS || '0.0.0.0';
const mongoPort = process.env.MONGODB_PORT || 27071;

export default {
    requestType: 'http://',
    db: {
        ip: dbIp,
        port: dpPort,
        address: `postgresql://${dbUser}:${dbPassword}@${dbIp}:${dpPort}/${dbName}`,
    },
    sessions: {
        address: `mongodb://${mongoUser}:${mongoPassword}@${mongoIp}:${mongoPort}`,
        collection: 'sessions',
        secret: 'secret', // TODO: Generate guid or something,
        lifeTimeOfSession: 14 * 24 * 60 * 60 * 1000,
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
