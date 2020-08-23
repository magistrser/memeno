import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import path from 'path';
import passport from 'passport';
import store from './sessions-store';
import configurePassport from './passports/vkontakte';
import config from '../config';
import routes from '../routes/routes';
import auth from './routers/auth';
import engine from './routers/engine';
import {needDeveloperAccess} from "./passports/validateAccessLevel";

const port = process.env.PORT || config.server.port;
const app = express();

app.use(
    session({
        store,
        secret: config.sessions.secret,
        resave: true,
        rolling: true,
        saveUninitialized: false,
        cookie: {
            maxAge: config.sessions.lifeTimeOfSession,
            httpOnly: false,
        },
    })
);

/* Passport configuration */
configurePassport(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(
    routes.development.root,
    needDeveloperAccess,
    express.static(path.join(__dirname, '../../dist-dev-client'))
);
app.use(
    routes.development.main,
    needDeveloperAccess,
    express.static(path.join(__dirname, '../../dist-dev-client'))
);
app.use(
    routes.development.login,
    needDeveloperAccess,
    express.static(path.join(__dirname, '../../dist-dev-client'))
);

app.use(routes.root, express.static(path.join(__dirname, '../../dist')));
app.use(routes.login, express.static(path.join(__dirname, '../../dist')));

// routers/auth
app.use(auth);
// routers/engine;
app.use(engine);

app.use('*', (req, res) => {
    res.redirect(routes.react.root);
});

app.listen(port);
