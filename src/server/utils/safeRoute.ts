import winstonLogger from '../logger/winston';
import { Request, Response, NextFunction } from 'express';

export default function safeRout<Req extends Request>(
    routeFunction: (
        req: Req,
        res: Response,
        next: NextFunction
    ) => Promise<void>
) {
    return async function (req: Req, res: Response, next: NextFunction) {
        try {
            await routeFunction(req, res, next);
        } catch (error) {
            res.status(500).json(error);
            winstonLogger.error(error);
        }
    };
}
