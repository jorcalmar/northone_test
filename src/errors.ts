import { HttpStatus } from './constants'

export const errors = {
  RESOURCE_NOT_FOUND: {
    statusCode: HttpStatus.NOT_FOUND,
    message: 'Resource was not found',
    name: 'RESOURCE_NOT_FOUND',
  },
  CATEGORY_NOT_FOUND: {
    statusCode: HttpStatus.NOT_FOUND,
    message: 'Category not found',
    name: 'CATEGORY_NOT_FOUND'
  }
};