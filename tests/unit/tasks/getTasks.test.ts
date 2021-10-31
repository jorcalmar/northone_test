import { createTasks } from '../../utils/data'

import { createTask, getTasks } from '../../../src/managers'
import { errors } from '../../../src/errors'

import { dbHooks } from '../../utils/db/dbHooks'

describe('Tests get tasks manager', () => {
    dbHooks()

    it('Gets existing tasks', async () => {
        const numTasks = 20
        const tasksToCreate = createTasks(numTasks);

        await Promise.all(tasksToCreate.map(createTask))

        const tasks = await getTasks()

        expect(tasks.length).toEqual(numTasks)
    })

    it('No tasks available', () => expect(getTasks()).rejects.toMatchObject(errors.RESOURCE_NOT_FOUND))
})
