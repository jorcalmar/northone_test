import { createTask, updateParent } from '../../../../src/managers'

import { createTaskInput } from '../../../utils/data'
import { dbHooks } from '../../../utils/db/dbHooks'

describe('Update task parent manager', () => {
    dbHooks()

    it('Update task parent manager', async () => {
        const parentInput = createTaskInput()
        const parentTask = await createTask(parentInput)

        const subTaskInput = createTaskInput({
            parentId: parentTask.id
        })

        const subTask = await createTask(subTaskInput)

        const updatedParent = await updateParent(parentTask.id, subTask.id)

        expect(updatedParent?.subTasksIds).toContain(subTask.id)
    })
})
