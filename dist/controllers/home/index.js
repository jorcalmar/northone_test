"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.homeController = void 0;
const homeController = (_req, res, next) => {
    res.send(200, {
        info: 'Homepage reached'
    });
    return next();
};
exports.homeController = homeController;
