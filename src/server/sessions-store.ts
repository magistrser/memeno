import session from 'express-session';
import MongoDBStore from 'connect-mongodb-session';
import config from "../config";

const store = new (MongoDBStore(session))(
    {
        uri: config.sessions.address,
        collection: config.sessions.collection,
        expires: config.sessions.lifeTimeOfSession,
        connectionOptions: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 10000
        }
    },
    function (error) {
        error ? console.log(error) : null;
    }
);
store.on('error', function (error) {
    error ? console.log(error) : null;
});

export default store;