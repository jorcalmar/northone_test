import { prop, getModelForClass, plugin } from '@typegoose/typegoose'
import { ICategory } from '../../interfaces/category'

import autopopulate from 'mongoose-autopopulate'
import { v4 } from 'uuid'

@plugin(autopopulate)
export class Category implements ICategory {
    @prop({ default: () => v4(), index: true })
    id: string

    @prop({ required: true })
    name: string
}

export const categoryModel = getModelForClass(Category, {
    schemaOptions: {
        timestamps: true
    }
})