import * as httpStatus from 'http-status'

export enum TaskStatuses {
    PENDING = 'PENDING',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE',
    EXPIRED = 'EXPIRED'
}

export enum HttpStatus {
    OK = httpStatus.OK,
    CREATED = httpStatus.CREATED,
    BAD_REQUEST = httpStatus.BAD_REQUEST,
    INTERNAL_SERVER_ERROR = httpStatus.INTERNAL_SERVER_ERROR,
    NOT_FOUND = httpStatus.NOT_FOUND
}