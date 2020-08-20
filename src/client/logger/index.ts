enum LogLevel {
    info = 'info',
    error = 'error',
    debug = 'debug',
}

class Logger {
    constructor(private loggerName: string) {}

    private static prettyTime(value): string {
        return value < 10 ? `0${value}` : `${value}`;
    }

    private static getDate(): string {
        const date = new Date();
        const year = date.getFullYear();
        const month = Logger.prettyTime(date.getMonth());
        const day = Logger.prettyTime(date.getDay());
        const hour = Logger.prettyTime(date.getHours());
        const minute = Logger.prettyTime(date.getMinutes());
        const seconds = Logger.prettyTime(date.getSeconds());

        return `${month}.${day}.${year} ${hour}:${minute}:${seconds}`;
    }

    private getLogMessage(
        logLevel: LogLevel,
        message: string,
        meta: any = null
    ): string {
        const metaStr = meta ? `, ${JSON.stringify(meta)}` : ``;
        return (
            `<${
                this.loggerName
            }>.[${logLevel}] {${Logger.getDate()}}: ${message}` + metaStr
        );
    }

    info(message: string, meta: any = null) {
        console.log(this.getLogMessage(LogLevel.info, message, meta));
    }

    error(message: string, meta: any = null) {
        console.log(this.getLogMessage(LogLevel.error, message, meta));
    }

    debug(message: string, meta: any) {
        console.log(this.getLogMessage(LogLevel.debug, message, meta));
    }
}

export const requestsLogger = new Logger('requests-logger');
