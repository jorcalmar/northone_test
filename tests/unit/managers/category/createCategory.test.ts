import { createCategory } from '../../../../src/managers'

import { createCategoryInput } from '../../../utils/data'

import { dbHooks } from "../../../utils/db/dbHooks"

describe('Tests create task manager', () => {
    dbHooks()

    it('Creates category successfully', async () => {
        const categoryInput = createCategoryInput()

        const createdCategory = await createCategory(categoryInput);

        expect(createdCategory).toMatchObject(categoryInput)
    })
})