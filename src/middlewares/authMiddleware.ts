import { Request, Response, Next } from 'restify'

export const authUserMiddleware = (req: Request, _res: Response, next: Next) => {
    const userId = '3333';

    req['userId'] = userId;

    return next();
}