import { taskModel, Task } from '../../db/models/task'
import { ITaskInput, ITask } from '../../interfaces/task'
import { validateCategory } from '../../managers'

import { errors } from '../../errors'

export const createTask = async (createTaskInput: ITaskInput): Promise<Task> => {
    const { categoryId } = createTaskInput;

    if (categoryId) {
        await validateCategory(categoryId)
    }

    const createdTask = await taskModel.create(createTaskInput);

    console.log('Task created', { id: createdTask.id })

    return createdTask;
}

export const updateTask = async (taskId: string, updateTaskInput: Partial<ITask>): Promise<Task> => {
    const { categoryId } = updateTaskInput;

    if (categoryId) {
        await validateCategory(categoryId)
    }

    const updatedTask = await taskModel.findOneAndUpdate({
        id: taskId
    }, {
        $set: updateTaskInput
    }, {
        new: true
    });

    if (!updatedTask) throw errors.RESOURCE_NOT_FOUND

    console.log('Task updated', { id: updatedTask.id })

    return updatedTask
}

export const deleteTask = async (taskId: string): Promise<Task> => {
    const deletedTask = await taskModel.findOneAndUpdate({
        id: taskId,
        deleted: false
    }, {
        $set: {
            deleted: true
        }
    }, {
        new: true
    })

    if (!deletedTask) throw errors.RESOURCE_NOT_FOUND

    console.log('Task deleted', { id: taskId })

    return deletedTask
}

/**
 * Gets all tasks.
 * @returns List of tasks
 */
export const getTasks = async (): Promise<Task[]> => {
    const tasks = await taskModel.find({})

    if (tasks.length === 0) {
        throw errors.RESOURCE_NOT_FOUND
    }

    return tasks
}

export const getOneTask = async (taskId: string): Promise<ITask> => {
    const task = await taskModel.findOne({
        id: taskId
    })

    if (!task) throw errors.RESOURCE_NOT_FOUND

    return task
}