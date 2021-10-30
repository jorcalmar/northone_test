import { Request, Response, Next } from 'restify'

import { HttpStatus } from '../constants';
import Ajv from 'ajv'
import addFormats from 'ajv-formats'

const ajv = new Ajv();

addFormats(ajv)

/**
 * Validats the body received in a service with the schema provided.
 * @param schema - JSON schema that validates.
 * @returns 
 */
export const bodySchemaValidatorMiddleware = (schema: any) =>
    (req: Request, res: Response, next: Next) => {
        const body = req.body

        const validate = ajv.compile(schema)

        if (validate(body)) {
            return next()
        } else {
            const responseErrors = validate.errors?.map(error => {
                return error.message
            })

            res.send(HttpStatus.BAD_REQUEST, {
                info: 'Invalid body',
                data: responseErrors
            })

            return next(false)
        }
    }