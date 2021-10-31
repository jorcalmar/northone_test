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
        }
    },
    minProperties: 1,
    additionalProperties: false
}
