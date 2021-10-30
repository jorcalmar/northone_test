import { bodySchemaValidatorMiddleware } from '../../../src/middlewares/bodySchemaValidator'
import { createTaskBodySchema } from '../../../src/schemas/createTaskBodySchema'
import { Request, Response, Next } from 'restify'

describe('Body schema validator middleware', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('Sends bad request error on invalid body', () => {
        const req = {
            body: {
                anyField: 'anyField'
            }
        } as Request

        const res = {
            send: jest.fn()
        } as unknown as Response

        const next = jest.fn() as Next

        bodySchemaValidatorMiddleware(createTaskBodySchema)(req, res, next);

        expect(res.send).toHaveBeenCalledWith(400, {
            info: 'Invalid body',
            data: [
                "must have required property 'description'"
            ]
        })

        expect(next).toHaveBeenCalledWith(false);
    })

    it('Sends valid body', () => {
        const req = {
            body: {
                title: 'any title',
                description: 'any description',
                dueDate: '2020-01-01'
            }
        } as Request

        const res = {
            send: jest.fn()
        } as unknown as Response

        const next = jest.fn() as Next

        bodySchemaValidatorMiddleware(createTaskBodySchema)(req, res, next);

        expect(res.send).not.toHaveBeenCalled();

        expect(next).toHaveBeenCalledWith();
    })
})