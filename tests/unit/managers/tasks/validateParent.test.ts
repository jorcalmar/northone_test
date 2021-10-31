import { createTask, validateParent } from '../../../../src/managers'
import { createTaskInput } from '../../../utils/data'
import { errors } from '../../../../src/errors'

import { dbHooks } from '../../../utils/db/dbHooks'

describe('Tests validate parent manager', () => {
    dbHooks()

    it('Parent is valid', async () => {
        const taskInput = createTaskInput()
        const { id: taskId } = await createTask(taskInput)

        expect(validateParent(taskId)).resolves
    })

    it('Parent is not in db', async () => expect(validateParent('any-id')).rejects.toMatchObject(errors.PARENT_NOT_FOUND))

    it('Parent is subtask', async () => {
        const parentInput = createTaskInput()
        const parentTask = await createTask(parentInput)

        const subtaskInput = createTaskInput({
            parentId: parentTask.id
        })

        const { id: subTaskId } = await createTask(subtaskInput)

        expect(validateParent(subTaskId)).rejects.toMatchObject(errors.PARENT_CANT_BE_SUBTASK)
    })
})