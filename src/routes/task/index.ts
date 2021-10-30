import { Request, Response, Next } from 'restify'
import { createTask } from '../../managers'

import { HttpStatus } from '../../constants';

/**
 * Route that handles the creation of tasks.
 * @param req - Http Request
 * @param res - Http Response 
 * @param next - Callback
 * @returns - void
 */
export const createTaskRoute = async (req: Request, res: Response, next: Next): Promise<void> => {
    try {
        const createTaskInput = req.body;

        const createdTask = await createTask(createTaskInput);

        res.send(HttpStatus.CREATED, {
            info: 'Task created',
            data: createdTask
        });

        return next();
    } catch (error) {
        console.log('Error creating task', { error })

        res.send(HttpStatus.INTERNAL_SERVER_ERROR, {
            error
        });

        return next();
    }
}
