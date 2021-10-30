import { TaskStatuses } from '../constants';

export interface ITask {
    title: String
    description: String
    status: TaskStatuses
    dueDate: Date
    userId: String
    subTasks: [ITask]
}