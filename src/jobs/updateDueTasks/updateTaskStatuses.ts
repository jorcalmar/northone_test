import { dbConnect, closeDb } from '../../db/connection'
import { updateDueTasks } from '../../managers'

import config from 'config'

export const updateTasksStatusesJob = async (callback = () => {}) => {
    await dbConnect(config.get('MONGO_URL'))
    await updateDueTasks()
    await closeDb()
    return callback()
}