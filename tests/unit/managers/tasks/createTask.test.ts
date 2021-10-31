import { createTask, createCategory } from '../../../../src/managers'
import { dbHooks } from '../../../utils/db/dbHooks'

import { createTaskInput, createCategoryInput } from '../../../utils/data'
import { errors } from '../../../../src/errors'

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
})