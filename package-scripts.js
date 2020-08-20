import { series } from 'nps-utils';

const nodemonServer = 'nodemon';
const clientWebpackProd = 'webpack --mode production';
const clientWebpackDev =
    'cross-env MODE=DEV webpack --mode development --devtool inline-source-map';
const devClientWebpack = 'webpack --config webpack.dev-client.config.js';

export default {
    scripts: {
        prod: series(clientWebpackProd, devClientWebpack, nodemonServer),
        dev: series(clientWebpackDev, devClientWebpack, nodemonServer),
        development: {
            runPostgres: 'cd pg-docker-server && ./run.sh && cd ..',
            loadMemes: 'npx ts-node ./src/scripts/loadMemesFromFolder.ts',
        },
        prettier: 'prettier --write .',
        eslint: 'eslint "src/**"',
        test: 'jest',
    },
};
