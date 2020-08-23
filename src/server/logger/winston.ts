import winston from 'winston';
import WinstonDailyRotateFile from 'winston-daily-rotate-file';

const winstonLogger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
        new WinstonDailyRotateFile({
            filename: 'server.log.%DATE%',
            dirname: './logs',
            maxSize: '10m',
            maxFiles: '31d',
            utc: true,
        }),
    ],
});

if (process.env.MODE === 'DEV') {
    winstonLogger.add(
        new winston.transports.Console({
            format: winston.format.simple(),
        })
    );
}

export default winstonLogger;
