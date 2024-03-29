import { serviceHooks } from '../../utils/service/serviceHooks'
import { HttpStatus } from '../../../src/constants'

import { app } from '../../../src/httpService'

import request from 'supertest'
import { createCategory, createTask } from '../../../src/managers'

import { createCategoryInput, createTaskInput, validDueDate, invalidDueDate } from '../../utils/data'

describe('Calls service to create Task', () => {
    serviceHooks()

    const apiRequest = request(app)

    it('Creates tasks successfully', async () => {
        await apiRequest
            .post('/api/v1/task')
            .send({
                title: 'title1',
                description: 'description1',
                dueDate: validDueDate
            })
            .expect(HttpStatus.CREATED)
    })

    it('Creates task with invalid body', async () => {
        await apiRequest
            .post('/api/v1/task')
            .send({
                anyField: 'any-field'
            })
            .expect(HttpStatus.BAD_REQUEST)
    })

    it('Creates tasks with existing category', async () => {
        const categoryInput = createCategoryInput({
            name: 'My category'
        })

        const createdCategory = await createCategory(categoryInput)

        await apiRequest
            .post('/api/v1/task')
            .send({
                title: 'title1',
                description: 'description1',
                dueDate: validDueDate,
                categoryId: createdCategory.id
            })
            .expect(HttpStatus.CREATED)
    })

    it('Creates tasks with non existing category', async () => {
        await apiRequest
            .post('/api/v1/task')
            .send({
                title: 'title1',
                description: 'description1',
                dueDate: validDueDate,
                categoryId: 'any-category-id'
            })
            .expect(HttpStatus.NOT_FOUND)
    })

    it('Creates subtask successfully', async () => {
        const parentTaskInput = createTaskInput()

        const parentTask = await createTask(parentTaskInput)

        const result = await apiRequest
            .post('/api/v1/task')
            .send({
                title: 'title1',
                description: 'description1',
                dueDate: validDueDate,
                parentId: parentTask.id
            })
            .expect(HttpStatus.CREATED)

        expect(result.body.data.parentId).toEqual(parentTask.id)
    })

    it('Creates subtask - parent does not exist', async () => {
        await apiRequest
            .post('/api/v1/task')
            .send({
                title: 'title1',
                description: 'description1',
                dueDate: validDueDate,
                parentId: 'any-id'
            })
            .expect(HttpStatus.NOT_FOUND)
    })

    it('Creates tasks with wrong date', async () => {
        await apiRequest
            .post('/api/v1/task')
            .send({
                title: 'title1',
                description: 'description1',
                dueDate: invalidDueDate
            })
            .expect(HttpStatus.BAD_REQUEST)
    })
})