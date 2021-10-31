import { categoryModel, Category } from '../../db/models/category'
import { ICategoryInput } from '../../interfaces/category'

import { errors } from '../../errors'

export const createCategory = (categoryInput: ICategoryInput): Promise<Category> => categoryModel.create(categoryInput)

export const validateCategory = async (categoryId: string): Promise<void> => {
    const foundCategory = await categoryModel.findOne({ id: categoryId })

    if (!foundCategory) throw errors.CATEGORY_NOT_FOUND
}