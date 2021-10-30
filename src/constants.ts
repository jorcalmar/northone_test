import * as httpStatus from 'http-status'

export enum TaskStatuses {
    PENDING = 'PENDING',
    DONE = 'DONE'
}

export enum HttpStatus {
    CREATED = httpStatus.CREATED,
    BAD_REQUEST = httpStatus.BAD_REQUEST,
    INTERNAL_SERVER_ERROR = httpStatus.INTERNAL_SERVER_ERROR
}