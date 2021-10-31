import { serviceHooks } from '../../utils/service/serviceHooks'
import { HttpStatus } from '../../../src/constants'

import { app } from '../../../src/httpService'

import request from 'supertest'

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
})