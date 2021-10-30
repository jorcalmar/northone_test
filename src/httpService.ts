import { createServer, plugins } from 'restify';
import { dbConnect, closeDb } from './db/connection';
import { homeController, createTaskRoute } from './routes';
import config from 'config';
import { bodySchemaValidatorMiddleware } from './middlewares/bodySchemaValidator';
import { createTaskBodySchema } from './schemas';

export const app = createServer()

/**
 * Configures and starts service.
 */
export const start = async () => {
    app.use(plugins.bodyParser());

    app.get('/', homeController);
    app.post('/api/v1/task', bodySchemaValidatorMiddleware(createTaskBodySchema), createTaskRoute);

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