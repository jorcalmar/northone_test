import { ITaskInput } from '../../src/interfaces/task'

export const createTaskInput = (values?: Partial<ITaskInput>): ITaskInput => ({
    title: 'title1',
    description: 'description1',
    dueDate: new Date(),
    deleted: false,
    ...values
})

export const createTasks = (numTasks: number, values?: Partial<ITaskInput>): ITaskInput[] => {
    const tasks: ITaskInput[] = []

    while (numTasks) {
        tasks.push(createTaskInput(values))

        numTasks--;
    }

    return tasks;
}