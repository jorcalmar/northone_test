import { createTask } from '../../../../src/managers'
import { dbHooks } from '../../../utils/db/dbHooks'

import { createTaskInput } from '../../../utils/data'

describe('Create task manager', () => {
    dbHooks()

    it('Creates task successfully', async () => {
        const input = createTaskInput();
        const createdTask = await createTask(input);

        expect(createdTask).toMatchObject(input)
    })
})