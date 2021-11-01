import { ICategory } from '../../src/interfaces/category'
import { ITaskInput, ITask } from '../../src/interfaces/task'

import moment from 'moment'

export const validDueDate = moment().add(4, 'days').format('YYYY-MM-DD')
export const invalidDueDate = moment().subtract(1, 'days').format('YYYY-MM-DD')

export const createTaskInput = (values?: Partial<ITask>): ITaskInput => ({
    title: 'title1',
    description: 'description1',
    dueDate: validDueDate,
    deleted: false,
    subTasksIds: [],
    ...values
})

export const createTasks = (numTasks: number, values?: Partial<ITask>): ITaskInput[] => {
    const tasks: ITaskInput[] = []

    while (numTasks) {
        tasks.push(createTaskInput(values))

        numTasks--;
    }

    return tasks;
}

export const createCategoryInput = (values?: Partial<ICategory>) => ({
    name: 'any-name',
    ...values
})