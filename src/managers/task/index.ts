import { taskModel, Task } from '../../db/models/task'
import { ITaskInput } from '../../interfaces/task'

export const createTask = async (createTaskInput: ITaskInput): Promise<Task> => {
    const createdTask = await taskModel.create(createTaskInput);

    return createdTask;
}