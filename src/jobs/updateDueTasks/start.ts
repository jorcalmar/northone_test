import { updateTasksStatusesJob } from './updateTaskStatuses'

console.log('Starting job to update due tasks')
updateTasksStatusesJob(() => {
    console.log('Finished job to update due tasks')
})
