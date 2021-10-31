import { serviceHooks } from '../../utils/service/serviceHooks'
import { HttpStatus } from '../../../src/constants'

import { app } from '../../../src/httpService'

import request from 'supertest'
describe('Tests service to create categories', () => {
    serviceHooks()

    const apiRequest = request(app)

    it('Creates category successfully', async () => {
        await apiRequest
            .post('/api/v1/category')
            .send({
                name: 'College'
            })
            .expect(HttpStatus.CREATED)
    })

    it('Creates category with invalid body', async () => {
        await apiRequest
            .post('/api/v1/task')
            .send({
                anyField: 'any-field'
            })
            .expect(HttpStatus.BAD_REQUEST)
    })
})