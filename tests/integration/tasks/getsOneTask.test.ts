import { serviceHooks } from '../../utils/service/serviceHooks'

import { app } from '../../../src/httpService'
import { createTask } from '../../../src/managers'
import { createTaskInput } from '../../utils/data'
import { HttpStatus } from '../../../src/constants'

import request from 'supertest'

describe('Calls service to get one task', () => {
    serviceHooks()

    const apiRequest = request(app)

    it('Gets tasks successfully', async () => {
        const taskInput = createTaskInput()
        const { id: taskId } = await createTask(taskInput)

        const result = await apiRequest
            .get(`/api/v1/tasks/${taskId}`)
            .expect(HttpStatus.OK)

        expect(result.body.data).toMatchSnapshot()
    })

    it('Gets one task when db is empty', async () => {
        await apiRequest
            .get('/api/v1/tasks/any-id')
            .expect(HttpStatus.NOT_FOUND)
    })

    it('Gets tasks with existing category', async () => {
        const taskInput = createTaskInput()
        const { id: taskId } = await createTask(taskInput)

        const result = await apiRequest
            .get(`/api/v1/tasks/${taskId}`)
            .expect(HttpStatus.OK)

        const returnedTask = result.body.data

        expect(returnedTask).toMatchSnapshot()
    })
})