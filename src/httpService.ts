import { createServer, plugins } from 'restify';
import { dbConnect, closeDb } from './db/connection';
import { homeController, createTaskRoute, updateTaskRoute, deleteTaskRoute, getTasksRoute, createCategoryRoute } from './routes';
import config from 'config';
import { bodySchemaValidatorMiddleware } from './middlewares/bodySchemaValidator';
import { createCategorySchema, createTaskBodySchema, updateTaskBodySchema } from './schemas';

export const app = createServer()

/**
 * Configures and starts service.
 */
export const start = async () => {
    app.use(plugins.bodyParser());

    app.get('/', homeController);

    app.post('/api/v1/task', bodySchemaValidatorMiddleware(createTaskBodySchema), createTaskRoute);
    app.patch('/api/v1/tasks/:taskId', bodySchemaValidatorMiddleware(updateTaskBodySchema), updateTaskRoute);
    app.del('/api/v1/tasks/:taskId', deleteTaskRoute);
    app.get('/api/v1/tasks', getTasksRoute);

    app.post('/api/v1/category', bodySchemaValidatorMiddleware(createCategorySchema), createCategoryRoute);

    await dbConnect(config.get('MONGO_URL'));
    await app.listen(config.get('PORT'));

    console.log(`Service listening`);
}

/**
 * Stops service.
 */
export const close = async () => {
    await closeDb();
    await app.close();
}