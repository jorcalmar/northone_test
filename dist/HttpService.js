"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.close = exports.start = void 0;
const restify_1 = require("restify");
const connection_1 = require("./db/connection");
const routes_1 = require("./routes");
const middlewares_1 = require("./middlewares");
const config_1 = __importDefault(require("config"));
const app = (0, restify_1.createServer)();
const start = async () => {
    app.use(restify_1.plugins.bodyParser());
    app.get('/', routes_1.homeController);
    app.post('/api/v1/users/me/task', middlewares_1.authUserMiddleware, routes_1.createTaskRoute);
    app.get('/api/v1/users/me/tasks', middlewares_1.authUserMiddleware, routes_1.getTasksRoute);
    app.del('/api/v1/users/me/tasks/:taskId', middlewares_1.authUserMiddleware, routes_1.deleteTaskRoute);
    await (0, connection_1.dbConnect)(config_1.default.get('MONGO_URL'));
    await app.listen(config_1.default.get('PORT'));
    console.log(`Service listening`);
};
exports.start = start;
const close = async () => {
    await (0, connection_1.closeDb)();
    await app.close();
};
exports.close = close;
