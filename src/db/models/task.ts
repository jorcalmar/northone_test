import { prop, getModelForClass, pre } from '@typegoose/typegoose'
import { TaskStatuses } from '../../constants'
import { Category } from './category'
import { v4 } from 'uuid'
import { ITask } from '../../interfaces/task'

const populateHook = function (next) {
    this.populate('category')

    return next()
}

@pre<Task>('findOneAndUpdate', populateHook)
@pre<Task>('find', populateHook)
@pre<Task>('findOne', populateHook)
@pre<Task>('save', populateHook)
export class Task implements ITask {
    @prop({ default: () => v4(), index: true })
    id: string

    @prop({ required: true })
    title: string

    @prop({ required: true })
    description: string

    @prop({ default: TaskStatuses.PENDING })
    status: TaskStatuses

    @prop({ default: new Date() })
    dueDate: Date

    @prop({ required: true, default: false })
    deleted: boolean

    @prop({ required: false })
    categoryId?: string

    @prop({
        ref: Category,
        foreignField: 'id',
        localField: 'categoryId',
        justOne: true
    })
    category: Category

    @prop({ required: false })
    subTasksIds?: string[]

    @prop({ required: false })
    parentId?: string
}

export const taskModel = getModelForClass(Task, {
    schemaOptions: {
        timestamps: true,
        toJSON: {
            transform: (_doc: any, ret: any) => {
                delete ret.__v
                delete ret._id

                delete ret.categoryId

                return ret;
            },
            virtuals: true
        },
        toObject: {
            virtuals: true
        }
    }
})