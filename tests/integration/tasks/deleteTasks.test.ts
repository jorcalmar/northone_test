import { serviceHooks } from '../../utils/service/serviceHooks'

import { app } from '../../../src/httpService'
import { createTask } from '../../../src/managers'
import { createTaskInput } from '../../utils/data'
import { HttpStatus } from '../../../src/constants'

import request from 'supertest'

describe('Calls service to delete tasks', () => {
    serviceHooks()

    const apiRequest = request(app)

    it('Deletes task successfully', async () => {
        const { id: taskId } = await createTask(createTaskInput())

        await apiRequest
            .del(`/api/v1/tasks/${taskId}`)
            .expect(HttpStatus.OK)
    })

    it('Deletes non existent task', async () => {
        await apiRequest
            .del('/api/v1/tasks/any-task-id')
            .expect(HttpStatus.NOT_FOUND)
    })

    it('Deletes already deleted task', async () => {
        const { id: taskId } = await createTask(createTaskInput({ deleted: true }))

        await apiRequest
            .del(`/api/v1/tasks/${taskId}`)
            .expect(HttpStatus.NOT_FOUND)
    })
})