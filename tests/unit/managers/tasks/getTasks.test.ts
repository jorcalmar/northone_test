import { createTasks, createCategoryInput, createTaskInput } from '../../../utils/data'

import { createTask, getTasks, createCategory } from '../../../../src/managers'
import { errors } from '../../../../src/errors'

import { dbHooks } from '../../../utils/db/dbHooks'

describe('Tests get tasks manager', () => {
    dbHooks()

    it('Gets existing tasks', async () => {
        const numTasks = 20
        const tasksToCreate = createTasks(numTasks);

        await Promise.all(tasksToCreate.map(createTask))

        const tasks = await getTasks()

        expect(tasks.length).toEqual(numTasks)
    })

    it('No tasks available', () => expect(getTasks()).rejects.toMatchObject(errors.RESOURCE_NOT_FOUND))

    it('Gets tasks with category', async () => {
        const categoryInput = createCategoryInput({ name: 'My category' })
        const createdCategory = await createCategory(categoryInput)

        const taskInput = createTaskInput({
            categoryId: createdCategory.id
        })

        await createTask(taskInput);

        const tasks = await getTasks();

        expect(tasks.length).toEqual(1)

        const returnedTask = tasks[0]

        expect(returnedTask.category.name).toEqual(createdCategory.name)
    })
})
