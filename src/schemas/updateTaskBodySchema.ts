import { TaskStatuses } from '../constants'

export const updateTaskBodySchema = {
    type: 'object',
    properties: {
        title: {
            type: 'string'
        },
        description: {
            type: 'string'
        },
        dueDate: {
            type: 'string',
            format: 'date'
        },
        categoryId: {
            type: 'string'
        },
        status: {
            type: 'string',
            enum: [TaskStatuses.DONE, TaskStatuses.IN_PROGRESS, TaskStatuses.PENDING]
        }
    },
    minProperties: 1,
    additionalProperties: false
}
