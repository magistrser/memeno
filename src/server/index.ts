import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import path from 'path';
import passport from 'passport';

import configurePassport from './passport';

import config from '../config';
import routes from '../routes';
import auth from './routers/auth';

const port = process.env.PORT || config.server.port;
const app = express();

/* Passport configuration */
app.use(
    session({
        secret: 'secret', // TODO: Generate guid or something
        resave: true,
        saveUninitialized: true,
        // TODO: consider using some type of storage (others do that)
        // https://stackoverflow.com/questions/29111571/passports-req-isauthenticated-always-returning-false-even-when-i-hardcode-done
    })
);
configurePassport(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../../dist')));

// routers/auth
app.use(auth);

app.get('*', function (req, res) {
    res.redirect(routes.react.root);
});

app.listen(port);
