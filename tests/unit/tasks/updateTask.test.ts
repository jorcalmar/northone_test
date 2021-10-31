import { createTask, updateTask } from '../../../src/managers'
import { dbHooks } from '../../utils/db/dbHooks'

import { createTaskInput } from '../../utils/data'

import { errors } from '../../../src/errors'

describe('Update task manager', () => {
    dbHooks()

    it('Updates task successfully', async () => {
        const input = createTaskInput();
        const { id } = await createTask(input);

        const updateInput = {
            title: 'new title',
            description: 'new description'
        }

        const updatedTask = await updateTask(id, updateInput)

        expect(updatedTask.title).toEqual(updateInput.title)
        expect(updatedTask.description).toEqual(updateInput.description)
    })

    it('Updates non existent task', async () => {
        const id = 'any-id'

        const updateInput = {
            title: 'new title',
            description: 'new description'
        }

        expect(updateTask(id, updateInput)).rejects.toMatchObject(errors.RESOURCE_NOT_FOUND)
    })
})