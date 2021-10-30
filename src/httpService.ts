import { createServer, plugins } from 'restify';
import { dbConnect, closeDb } from './db/connection';
import { homeController, createTaskRoute, getTasksRoute, deleteTaskRoute } from './routes';
import { authUserMiddleware } from './middlewares';
import config from 'config';

const app = createServer()

export const start = async () => {
    app.use(plugins.bodyParser());

    app.get('/', homeController);
    app.post('/api/v1/users/me/task', authUserMiddleware, createTaskRoute);
    app.get('/api/v1/users/me/tasks', authUserMiddleware, getTasksRoute);
    app.del('/api/v1/users/me/tasks/:taskId', authUserMiddleware, deleteTaskRoute)

    await dbConnect(config.get('MONGO_URL'));
    await app.listen(config.get('PORT'));

    console.log(`Service listening`);
}

export const close = async () => {
    await closeDb();
    await app.close();
}