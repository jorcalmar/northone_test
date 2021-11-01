import { createTaskInput, createTasks } from '../../utils/data'
import { dbHooks } from '../../utils/db/dbHooks'
import {  getTasks, updateDueTasks } from '../../../src/managers'

import { TaskStatuses } from '../../../src/constants'

import { taskModel } from '../../../src/db/models/task'

import moment from 'moment'

describe('Tests job that updates due tasks', () => {
    dbHooks()

    it('Updates all tasks', async () => {
        const today = moment().format('YYYY-MM-DD')
        const tomorrow = moment().add(1, 'days').format('YYYY-MM-DD')

        const numExpiredTasks = 50
        const numOnTimeTasks = 300
        const numDoneTasksExpireToday = 100

        const dueTasksInputs = createTasks(numExpiredTasks, {
            dueDate: today,
            status: TaskStatuses.PENDING
        })

        const onTimeTasksInputs = createTasks(numOnTimeTasks, {
            dueDate: tomorrow,
            status: TaskStatuses.IN_PROGRESS
        })

        const doneTasksExpireTodayInputs = createTasks(numDoneTasksExpireToday, {
            dueDate: today,
            status: TaskStatuses.DONE
        })

        await Promise.all([...dueTasksInputs, ...onTimeTasksInputs, ...doneTasksExpireTodayInputs].map(task => taskModel.create(task)))

        await updateDueTasks()

        const updatedTasks = await getTasks({ status: TaskStatuses.EXPIRED })
        const onTimeTasks = await getTasks({ status: TaskStatuses.IN_PROGRESS })
        const doneTasksExpireToday = await getTasks({ status: TaskStatuses.DONE })

        expect(updatedTasks.length).toEqual(numExpiredTasks)
        expect(onTimeTasks.length).toEqual(numOnTimeTasks)
        expect(doneTasksExpireToday.length).toEqual(numDoneTasksExpireToday)
    })

    it('Updates all tasks - one task with subtasks', async () => {
        const today = moment().format('YYYY-MM-DD')

        const numSubTasks = 300

        const parentTaskInput = createTaskInput({
            dueDate: today,
            status: TaskStatuses.PENDING
        })

        const parentTask = await taskModel.create(parentTaskInput)

        const subTasksInputs = createTasks(numSubTasks, {
            dueDate: today,
            status: TaskStatuses.PENDING,
            parentId: parentTask.id
        })

        await Promise.all(subTasksInputs.map(task => taskModel.create(task)))

        await updateDueTasks()

        const updatedTasks = await getTasks({ status: TaskStatuses.EXPIRED })

        expect(updatedTasks.length).toEqual(numSubTasks + 1)
    })
})