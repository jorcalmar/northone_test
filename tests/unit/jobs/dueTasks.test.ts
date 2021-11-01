import { createTasks } from '../../utils/data'
import { dbHooks } from '../../utils/db/dbHooks'
import { createTask, getTasks } from '../../../src/managers'

import { TaskStatuses } from '../../../src/constants'

import { updateTasksStatusesJob } from '../../../src/jobs/updateDueTasks/updateTaskStatuses'

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

        await Promise.all([...dueTasksInputs, ...onTimeTasksInputs, ...doneTasksExpireTodayInputs].map(task => createTask(task)))

        await updateTasksStatusesJob()

        const updatedTasks = await getTasks({ status: TaskStatuses.EXPIRED })
        const onTimeTasks = await getTasks({ status: TaskStatuses.IN_PROGRESS })
        const doneTasksExpireToday = await getTasks({ status: TaskStatuses.DONE })

        expect(updatedTasks.length).toEqual(numExpiredTasks)
        expect(onTimeTasks.length).toEqual(numOnTimeTasks)
        expect(doneTasksExpireToday.length).toEqual(numDoneTasksExpireToday)
    })
})