import { createTask, deleteTask } from '../../../src/managers/task'
import { errors } from '../../../src/errors'

import { dbHooks } from '../../utils/db/dbHooks'
import { createTaskInput } from '../../utils/data'

describe('Tests delete task manager', () => {
    dbHooks()

    it('Deletes task successfully', async () => {
        const { id: taskId } = await createTask(createTaskInput())

        const deletedTask = await deleteTask(taskId)

        expect(deletedTask.deleted).toEqual(true)
    })

    it('Deletes non existent task', async () => {
        const taskId = 'any-id'
        expect(deleteTask(taskId)).rejects.toMatchObject(errors.RESOURCE_NOT_FOUND)
    })

    it('Deletes already deleted task', async () => {
        const { id: taskId } = await createTask(createTaskInput({ deleted: true }))

        expect(deleteTask(taskId)).rejects.toMatchObject(errors.RESOURCE_NOT_FOUND)
    })
})