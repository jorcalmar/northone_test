import { createCategoryInput, createTaskInput } from '../../../utils/data'

import { createTask, getOneTask, createCategory } from '../../../../src/managers'
import { errors } from '../../../../src/errors'

import { dbHooks } from '../../../utils/db/dbHooks'
import moment from 'moment'

describe('Tests get tasks manager', () => {
    dbHooks()

    it('Gets existing task', async () => {
        const tasksToCreate = createTaskInput();

        const createdTask = await createTask(tasksToCreate)

        const task = await getOneTask(createdTask.id)

        expect(task).not.toBeUndefined()
    })

    it('No tasks available', () => expect(getOneTask('any-id')).rejects.toMatchObject(errors.RESOURCE_NOT_FOUND))

    it('Gets tasks with category', async () => {
        const categoryInput = createCategoryInput({ name: 'My category' })
        const createdCategory = await createCategory(categoryInput)

        const taskInput = createTaskInput({
            categoryId: createdCategory.id
        })

        const createdTask = await createTask(taskInput);

        const task = await getOneTask(createdTask.id);

        expect(task.category?.name).toEqual(createdCategory.name)
    })

    it('Gets task and validates days left', async () => {
        const numDaysDiff = 5

        const tasksToCreate = createTaskInput({
            dueDate: moment().add(numDaysDiff, 'days').format('YYYY-MM-DD')
        });

        const createdTask = await createTask(tasksToCreate)

        const task = await getOneTask(createdTask.id)

        expect(task.daysLeft).toEqual(numDaysDiff)
    })
})
