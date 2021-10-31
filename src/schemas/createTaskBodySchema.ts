export const createTaskBodySchema = {
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
        }
    },
    required: ['description', 'dueDate', 'title'],
    additionalProperties: false
}