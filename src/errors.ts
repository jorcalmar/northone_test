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
  },
  PARENT_NOT_FOUND: {
    statusCode: HttpStatus.NOT_FOUND,
    message: 'Parent not found',
    name: 'PARENT_NOT_FOUND'
  },
  PARENT_CANT_BE_SUBTASK: {
    statusCode: HttpStatus.BAD_REQUEST,
    message: 'Parent cannot be subtask',
    name: 'PARENT_CANT_BE_SUBTASK'
  }
};