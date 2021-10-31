import { TaskStatuses } from '../constants';
import { ICategory } from '../interfaces/category'

export interface ITask {
    id: String
    title: String
    description: String
    status: TaskStatuses
    dueDate: string
    deleted: boolean
    categoryId?: string
    category?: ICategory
    subTasksIds?: string[]
    parentId?: string
}

export type ITaskInput = Omit<ITask, 'status' | 'id'>