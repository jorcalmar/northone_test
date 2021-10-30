import { serviceHooks } from '../../utils/service/serviceHooks'

import { app } from '../../../src/httpService'
import { createTask } from '../../../src/managers'
import { createTaskInput } from '../../utils/data'
import { HttpStatus } from '../../../src/constants'

import request from 'supertest'

describe('Calls service to update tasks', () => {
    serviceHooks()

    const apiRequest = request(app)

    it('Updates task successfully', async () => {
        const { id: taskId } = await createTask(createTaskInput())

        await apiRequest
            .patch(`/api/v1/tasks/${taskId}`)
            .send({
                title: 'title1',
                description: 'description1'
            })
            .expect(HttpStatus.OK)
    })

    it('Updates task with invalid body', async () => {
        await apiRequest
            .patch('/api/v1/tasks/any-task-id')
            .send({
                anyField: 'any-field'
            }).expect(HttpStatus.BAD_REQUEST)
    })

    it('Updates non existent task', async () => {
        await apiRequest
            .patch('/api/v1/tasks/any-task-id')
            .send({
                title: 'title'
            }).expect(HttpStatus.NOT_FOUND)
    })
})