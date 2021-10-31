import { prop, getModelForClass } from '@typegoose/typegoose'
import { v4 } from 'uuid'

export class Category {
    @prop({ default: () => v4(), index: true, unique: true })
    id: string

    @prop({ required: true })
    name: string
}

export const categoryModel = getModelForClass(Category, {
    schemaOptions: {
        timestamps: true,
        toJSON: {
            transform: (_doc: any, ret: any) => {
                delete ret.__v
                delete ret._id

                delete ret.categoryId

                return ret
            }
        }
    }
})