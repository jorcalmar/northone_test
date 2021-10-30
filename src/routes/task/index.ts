import { Request, Response, Next } from 'restify'
import { createTask, getTasksByUserId, deleteTaskById } from '../../managers'

export const createTaskRoute = async (req: Request, res: Response, next: Next) => {
    try {
        const userId = req['userId'];

        const createTaskInput = {
            ...req.body,
            userId
        }

        const createdTask = await createTask(createTaskInput);

        res.send(201, {
            info: 'Task created',
            data: createdTask
        });

        return next();
    } catch (error) {
        console.log('Error creating task', { error })

        res.send(500, {
            error
        });

        return next();
    }
}

export const getTasksRoute = async (req: Request, res: Response, next: Next) => {
    const userId = req['userId']

    try {
        const tasks = await getTasksByUserId(userId);

        res.send(200, {
            info: 'Tasks retrieved',
            data: tasks
        });

        return next();
    } catch (error) {
        console.log('Error retrieving tasks', error)

        res.send(500, { error });

        return next()
    }
}

export const deleteTaskRoute = async (req: Request, res: Response, next: Next): Promise<void> => {
    const taskId = req.params['taskId'];
    const userId = req['userId']

    try {
        await deleteTaskById(userId, taskId)

        res.send(200, {
            info: 'Task deleted'
        })

        return next();
    } catch (error) {
        console.log('Error deleting task', { error })

        res.send(500, {
            error
        });

        return next();
    }
}