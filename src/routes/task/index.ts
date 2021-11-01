import { Request, Response, Next } from 'restify'
import { createTask, updateTask, deleteTask, getTasks, getOneTask } from '../../managers'

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

        res.send(error.statusCode, {
            error
        });

        return next();
    }
}

/**
 * Route that handles the creation of tasks.
 * @param req - Http Request
 * @param res - Http Response 
 * @param next - Callback
 * @returns - void
 */
export const updateTaskRoute = async (req: Request, res: Response, next: Next): Promise<void> => {
    try {
        const updateTaskInput = req.body;
        const taskId = req.params.taskId

        const updatedTask = await updateTask(taskId, updateTaskInput);

        res.send(HttpStatus.OK, {
            info: 'Task updated',
            data: updatedTask
        });

        return next();
    } catch (error) {
        console.log('Error updating task', { error })

        res.send(error.statusCode, {
            message: error.message
        });

        return next();
    }
}

/**
 * Route that handles the creation of tasks.
 * @param req - Http Request
 * @param res - Http Response 
 * @param next - Callback
 * @returns - void
 */
export const deleteTaskRoute = async (req: Request, res: Response, next: Next): Promise<void> => {
    try {
        const taskId = req.params.taskId

        const updatedTask = await deleteTask(taskId);

        res.send(HttpStatus.OK, {
            info: 'Task was deleted',
            data: updatedTask
        });

        return next();
    } catch (error) {
        console.log('Error deleting task', { error })

        res.send(error.statusCode, {
            message: error.message
        });

        return next();
    }
}

/**
 * Route that handles getting tasks
 * @param req - Http Request
 * @param res - Http Response 
 * @param next - Callback
 * @returns - void
 */
export const getTasksRoute = async (req: Request, res: Response, next: Next): Promise<void> => {
    try {
        const searchTextQuery = req.query?.search

        const query = searchTextQuery ? {
            $text: {
                $search: searchTextQuery
            }
        } : {}

        const tasks = await getTasks(query);

        res.send(HttpStatus.OK, {
            info: 'Tasks retrieved',
            data: tasks
        })

        return next()
    } catch (error) {
        console.log('Error getting tasks', error)

        res.send(error.statusCode, {
            error
        })
    }
}

export const getOneTaskRoute = async (req: Request, res: Response, next: Next): Promise<void> => {
    try {
        const { taskId } = req.params

        const foundTask = await getOneTask(taskId)

        res.send(HttpStatus.OK, {
            info: 'Task found',
            data: foundTask
        })
    } catch (error) {
        res.send(error.statusCode, {
            error
        })
    }

    return next()
}