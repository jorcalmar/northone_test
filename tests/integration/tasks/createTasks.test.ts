import { serviceHooks } from '../../utils/service/serviceHooks'
import { HttpStatus } from '../../../src/constants'

import { app } from '../../../src/httpService'

import request from 'supertest'
import { createCategory } from '../../../src/managers'

import { createCategoryInput } from '../../utils/data'

describe('Calls service to create Task', () => {
    serviceHooks()

    const apiRequest = request(app)

    it('Creates tasks successfully', async () => {
        await apiRequest
            .post('/api/v1/task')
            .send({
                title: 'title1',
                description: 'description1',
                dueDate: '2021-01-01'
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
                dueDate: '2021-01-01',
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
                dueDate: '2021-01-01',
                categoryId: 'any-category-id'
            })
            .expect(HttpStatus.NOT_FOUND)
    })
})