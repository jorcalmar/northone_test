"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authUserMiddleware = void 0;
const authUserMiddleware = (req, _res, next) => {
    const userId = '3333';
    req['userId'] = userId;
    return next();
};
exports.authUserMiddleware = authUserMiddleware;
