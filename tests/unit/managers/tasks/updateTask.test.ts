import { createCategory, createTask, getTasks, updateTask } from '../../../../src/managers'
import { dbHooks } from '../../../utils/db/dbHooks'

import { createCategoryInput, createTaskInput, invalidDueDate, validDueDate } from '../../../utils/data'

import { errors } from '../../../../src/errors'

import moment from 'moment'

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

    it('Updates deleted task', async () => {
        const input = createTaskInput({
            deleted: true
        });

        const { id } = await createTask(input);

        const updateInput = {
            dueDate: validDueDate
        }

        expect(updateTask(id, updateInput)).rejects.toMatchObject(errors.RESOURCE_NOT_FOUND)
    })

    it('Updates subtasks if parent date changes', async () => {
        let numSubTasks = 20
        let subTask

        const initialDate = moment().add(5, 'days').format('YYYY-MM-DD')
        const updatedDate = moment(initialDate).subtract(2, 'days').format('YYYY-MM-DD')

        const parentTaskInput = createTaskInput({
            dueDate: initialDate
        })

        const parentTask = await createTask(parentTaskInput)

        const subTaskInput = createTaskInput({
            parentId: parentTask.id,
            dueDate: initialDate
        })

        subTask = await createTask(subTaskInput)

        while (numSubTasks) {
            const subTaskInput = createTaskInput({
                parentId: subTask.id,
                dueDate: initialDate
            })

            subTask = await createTask(subTaskInput)
            numSubTasks--
        }

        await updateTask(parentTask.id, {
            dueDate: updatedDate
        })

        const allTasks = await getTasks()

        allTasks.forEach(task => {
            expect(task.dueDate).toEqual(updatedDate)
        })
    })

    it('Updates subtasks if parent date changes - only those later than new date', async () => {
        let numSubTasks = 20
        const diffDays = 13

        let subTask

        const initialDate = moment().add(40, 'days').format('YYYY-MM-DD')
        const updatedDate = moment(initialDate).subtract(diffDays, 'days').format('YYYY-MM-DD')

        const parentTaskInput = createTaskInput({
            dueDate: initialDate
        })

        const parentTask = await createTask(parentTaskInput)

        const subTaskInput = createTaskInput({
            parentId: parentTask.id,
            dueDate: moment(initialDate).subtract(1, 'days').format('YYYY-MM-DD')
        })

        subTask = await createTask(subTaskInput)

        while (numSubTasks) {
            const subTaskInput = createTaskInput({
                parentId: subTask.id,
                dueDate: moment(subTask.dueDate).subtract(1, 'days').format('YYYY-MM-DD')
            })

            subTask = await createTask(subTaskInput)
            numSubTasks--
        }

        await updateTask(parentTask.id, {
            dueDate: updatedDate
        })

        const allTasks = await getTasks()

        const updatedTasks = allTasks.filter(task => task.dueDate === updatedDate)

        /**
         * The tree that's created for the test has a depth of 21.
         * Each subtask has been created with one due date less.
         * Since we are moving the parent task 13 days forward,
         * 13 subtasks will have the new date.
         * We add 1 to include the original parent task.
         * 
         */
        expect(updatedTasks).toHaveLength(diffDays + 1)
    })
})