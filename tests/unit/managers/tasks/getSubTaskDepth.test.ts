import { errors } from "../../../../src/errors"
import { createTask, getSubTaskDepth } from "../../../../src/managers"
import { createTaskInput } from "../../../utils/data"
import { dbHooks } from "../../../utils/db/dbHooks"

// import config from 'config'

describe('Tests manger to get task tree depth', () => {
    dbHooks()

    it('Tree is valid', async () => {
        let numSubTasks = 20
        let subTask

        const parentTaskInput = createTaskInput()

        const parentTask = await createTask(parentTaskInput)

        const subTaskInput = createTaskInput({
            parentId: parentTask.id
        })

        subTask = await createTask(subTaskInput)

        while (numSubTasks) {
            const subTaskInput = createTaskInput({
                parentId: subTask.id
            })
            subTask = await createTask(subTaskInput)
            numSubTasks--
        }

        const depth = await getSubTaskDepth(subTask, 0)

        expect(depth).toEqual(21)
    })

    it('Tree is not valid', async () => {
        let numSubTasks = 50
        let subTask

        const parentTaskInput = createTaskInput()

        const parentTask = await createTask(parentTaskInput)

        const subTaskInput = createTaskInput({
            parentId: parentTask.id
        })

        subTask = await createTask(subTaskInput)

        try {
            while (numSubTasks) {
                const subTaskInput = createTaskInput({
                    parentId: subTask.id
                })

                subTask = await createTask(subTaskInput)
                numSubTasks--
            }
        } catch (error) {
            expect(error).toMatchObject(errors.MAX_NESTED_LEVEL_REACHED)
        }
    })
})