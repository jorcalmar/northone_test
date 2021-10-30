import { TaskStatuses } from '../constants';

export interface ITask {
    id: String
    title: String
    description: String
    status: TaskStatuses
    dueDate: Date
}

export type ITaskInput = Omit<ITask, 'status' | 'id'>