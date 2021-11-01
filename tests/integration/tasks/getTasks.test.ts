import { serviceHooks } from '../../utils/service/serviceHooks'

import { app } from '../../../src/httpService'
import { createTask } from '../../../src/managers'
import { createTaskInput } from '../../utils/data'
import { HttpStatus } from '../../../src/constants'

import request from 'supertest'

describe('Calls service to get tasks', () => {
    serviceHooks()

    const apiRequest = request(app)

    it('Gets tasks successfully', async () => {
        const taskInput = createTaskInput()
        await createTask(taskInput)

        const result = await apiRequest
            .get('/api/v1/tasks')
            .expect(HttpStatus.OK)

        expect(result.body.data.length).toEqual(1)
    })

    it('Gets tasks when db is empty', async () => {
        await apiRequest
            .get('/api/v1/tasks')
            .expect(HttpStatus.NOT_FOUND)
    })

    it('Gets tasks with existing category', async () => {
        const taskInput = createTaskInput()
        await createTask(taskInput)

        const result = await apiRequest
            .get('/api/v1/tasks')
            .expect(HttpStatus.OK)

        const returnedTasks = result.body.data

        expect(returnedTasks.length).toEqual(1)

        expect(returnedTasks[0]).toMatchSnapshot({
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
            id: expect.any(String)
        })
    })
})