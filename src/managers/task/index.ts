import { taskModel } from '../../db/models/task'
import { ITask } from '../../interfaces/task'

export const createTask = async (createTaskInput: ITask): Promise<ITask> => {
    const createdTask = await taskModel.create(createTaskInput);

    return createdTask;
}

export const getTasksByUserId = async (userId: string): Promise<ITask[]> => {
    const tasks = await taskModel.find({
        userId
    })

    return tasks;
}

export const deleteTaskById = async (userId: string, taskId): Promise<void> => {
    await taskModel.remove({
        userId,
        _id: taskId
    })
}