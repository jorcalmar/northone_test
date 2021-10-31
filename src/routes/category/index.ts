import { createCategory } from '../../managers'

import { Request, Response, Next } from 'restify'
import { HttpStatus } from '../../constants'

export const createCategoryRoute = async (req: Request, res: Response, next: Next) => {
    const body = req.body

    const createdCategory = await createCategory(body);

    res.send(HttpStatus.CREATED, {
        info: 'Category created',
        data: createdCategory
    })

    return next();
}