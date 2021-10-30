export const createTaskBodySchema = {
    type: 'object',
    properties: {
        title: {
            type: 'string'
        },
        description: {
            type: 'string'
        },
        parentId: {
            type: 'string'
        },
        dueDate: {
            type: 'string',
            format: 'date'
        }
    },
    required: ['description', 'dueDate', 'title'],
    additionalProperties: false
}