import { createCategory, createTask, updateTask } from '../../../../src/managers'
import { dbHooks } from '../../../utils/db/dbHooks'

import { createCategoryInput, createTaskInput, invalidDueDate, validDueDate } from '../../../utils/data'

import { errors } from '../../../../src/errors'

describe('Update task manager', () => {
    dbHooks()

    it('Updates task successfully', async () => {
        const input = createTaskInput();
        const { id } = await createTask(input);

        const updateInput = {
            title: 'new title',
            description: 'new description'
        }

        const updatedTask = await updateTask(id, updateInput)

        expect(updatedTask.title).toEqual(updateInput.title)
        expect(updatedTask.description).toEqual(updateInput.description)
    })

    it('Updates non existing task', async () => {
        const id = 'any-id'

        const updateInput = {
            title: 'new title',
            description: 'new description'
        }

        expect(updateTask(id, updateInput)).rejects.toMatchObject(errors.RESOURCE_NOT_FOUND)
    })

    it('Updates task with existing category', async () => {
        const categoryInput = createCategoryInput({ name: 'My category' })
        const createdCategory = await createCategory(categoryInput)

        const input = createTaskInput({
            categoryId: createdCategory.id
        });

        const { id } = await createTask(input);

        const updateInput = {
            title: 'new title',
            description: 'new description'
        }

        const updatedTask = await updateTask(id, updateInput)

        expect(updatedTask.title).toEqual(updateInput.title)
        expect(updatedTask.description).toEqual(updateInput.description)
    })

    it('Updates task with non existing category', async () => {
        const input = createTaskInput({});

        const { id } = await createTask(input);

        const updateInput = {
            title: 'new title',
            description: 'new description',
            categoryId: 'any-category'
        }

        expect(updateTask(id, updateInput)).rejects.toMatchObject(errors.CATEGORY_NOT_FOUND)
    })

    it('Changes task category', async () => {
        const categoryInput = createCategoryInput({ name: 'My category' })
        const newCategoryInput = createCategoryInput({ name: 'New category' })

        const createdCategory = await createCategory(categoryInput)
        const newCategory = await createCategory(newCategoryInput)

        const input = createTaskInput({
            categoryId: createdCategory.id
        });

        const { id } = await createTask(input);

        const updateInput = {
            title: 'new title',
            description: 'new description',
            categoryId: newCategory.id
        }

        const updatedTask = await updateTask(id, updateInput)

        expect(updatedTask.title).toEqual(updateInput.title)
        expect(updatedTask.description).toEqual(updateInput.description)
        expect(updatedTask.category.name).toEqual(newCategory.name)
    })

    it('Updates task with valid date', async () => {
        const input = createTaskInput({});

        const { id } = await createTask(input);

        const updateInput = {
            dueDate: validDueDate
        }

        const updatedTask = await updateTask(id, updateInput)

        expect(updatedTask.dueDate).toEqual(validDueDate)
    })

    it('Updates task with invalid date', async () => {
        const input = createTaskInput();

        const { id } = await createTask(input);

        const updateInput = {
            dueDate: invalidDueDate
        }

        expect(updateTask(id, updateInput)).rejects.toMatchObject(errors.INVALID_DUE_DATE)
    })
})