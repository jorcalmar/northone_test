import { categoryModel, Category } from '../../db/models/category'
import { ICategoryInput } from '../../interfaces/category'

export const createCategory = (categoryInput: ICategoryInput): Promise<Category> => categoryModel.create(categoryInput)