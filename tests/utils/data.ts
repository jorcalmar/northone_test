import { ICategory } from '../../src/interfaces/category'
import { ITaskInput, ITask } from '../../src/interfaces/task'

export const createTaskInput = (values?: Partial<ITask>): ITaskInput => ({
    title: 'title1',
    description: 'description1',
    dueDate: '2099-01-1',
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