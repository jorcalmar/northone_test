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
  MAX_NESTED_LEVEL_REACHED: {
    statusCode: HttpStatus.BAD_REQUEST,
    message: 'Too many levels of subtasks',
    name: 'MAX_NESTED_LEVEL_REACHED'
  },
  INVALID_DUE_DATE: {
    statusCode: HttpStatus.BAD_REQUEST,
    message: 'Due date is invalid',
    name: 'INVALID_DUE_DATE'
  }
};