import { createTask, validateParent, validateParentDate } from '../../../../src/managers'
import { createTaskInput } from '../../../utils/data'
import { errors } from '../../../../src/errors'

import { dbHooks } from '../../../utils/db/dbHooks'
import moment from 'moment'

describe('Tests validate parent manager', () => {
    dbHooks()

    it('Parent is valid', async () => {
        const taskInput = createTaskInput()
        const { id: taskId } = await createTask(taskInput)

        expect(validateParent(taskId)).resolves
    })

    it('Parent is not in db', async () => expect(validateParent('any-id')).rejects.toMatchObject(errors.PARENT_NOT_FOUND))

    it('Subtask date is invalid', async () => {
        const parentInput = createTaskInput({
            dueDate: moment().format('YYYY-MM-DD')
        })

        const parent = await createTask(parentInput)

        const dueDate = moment().add(5, 'days').format('YYYY-MM-DD')

        expect(() => validateParentDate(parent, dueDate)).toThrow(errors.INVALID_DUE_DATE)
    })

    it('Subtask date is valid', async () => {
        const parentInput = createTaskInput({
            dueDate: moment().format('YYYY-MM-DD')
        })

        const parent = await createTask(parentInput)

        const dueDate = parentInput.dueDate

        expect(() => validateParentDate(parent, dueDate)).not.toThrow()
    })
})