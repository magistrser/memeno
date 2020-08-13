import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

import config from '../config';
import auth from './routers/auth';

const port = process.env.PORT || config.server.port;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../../dist')));

app.get('/', function (req, res) {
    res.sendFile('/dist/index.html');
});
app.get('*', function (req, res) {
    res.redirect('/');
});

app.use('/auth', auth);

app.listen(port);
