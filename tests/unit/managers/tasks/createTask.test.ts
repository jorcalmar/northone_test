import { createTask, createCategory } from '../../../../src/managers'
import { dbHooks } from '../../../utils/db/dbHooks'

import { createTaskInput, createCategoryInput } from '../../../utils/data'
import { errors } from '../../../../src/errors'
import moment from 'moment'

describe('Create task manager', () => {
    dbHooks()

    it('Creates task successfully', async () => {
        const input = createTaskInput();
        const createdTask = await createTask(input);

        expect(createdTask).toMatchObject(input)
    })

    it('Creates task with existing category', async () => {
        const categoryInput = createCategoryInput({ name: 'My category' })
        const { id: categoryId } = await createCategory(categoryInput)

        const input = createTaskInput({
            categoryId: categoryId
        })

        const createdTask = await createTask(input);

        expect(createdTask).toMatchObject(input)
    })

    it('Creates task with non existing category', async () => {
        const input = createTaskInput({
            categoryId: 'any-id'
        })

        expect(createTask(input)).rejects.toMatchObject(errors.CATEGORY_NOT_FOUND)
    })

    it('Creates task due today', async () => {
        const input = createTaskInput({
            dueDate: moment().format('YYYY-MM-DD')
        });

        const createdTask = await createTask(input);

        expect(createdTask).toMatchObject(input)
    })

    it('Creates task due yesterday', async () => {
        const input = createTaskInput({
            dueDate: moment().subtract(1, 'days').format('YYYY-MM-DD')
        });

        expect(createTask(input)).rejects.toMatchObject(errors.INVALID_DUE_DATE)
    })
})