export default {
    scripts: {
        prod: 'webpack --mode production && nodemon',
        dev:
            'cross-env MODE=DEV webpack --mode development --devtool inline-source-map && nodemon',

        development: {
            runPostgres: 'cd pg-docker-server && ./run.sh && cd ..',
            loadMemes: 'npx ts-node ./src/scripts/loadMemesFromFolder.ts',
        },
        prettier: 'prettier --write .',
        eslint: 'eslint "src/**"',
        test: 'jest',
    },
};
