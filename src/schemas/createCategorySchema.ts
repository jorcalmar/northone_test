export const createCategorySchema = {
    type: 'object',
    properties: {
        name: {
            type: 'string'
        }
    },
    required: ['name'],
    additionalProperties: false
}