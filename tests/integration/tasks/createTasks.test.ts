import { serviceHooks } from '../../utils/service/serviceHooks'

import { app } from '../../../src/httpService'

import request from 'supertest'

describe('Calls service to create Task', () => {
    serviceHooks()

    const apiRequest = request(app)

    it('Creates tasks successfully', async () => {
        const result = await apiRequest
            .post('/api/v1/users/me/task')
            .send({
                title: 'title1',
                description: 'description1',
                dueDate: '2021-01-01'
            })

        expect(result.statusCode).toEqual(201);
        expect(result.body.info).toEqual('Task created');
    })

    it('Creates task with invalid body', async () => {
        const result = await apiRequest
            .post('/api/v1/users/me/task')
            .send({
                anyField: 'any-field'
            })

        expect(result.statusCode).toEqual(400);
    })
})