import { prop, getModelForClass } from '@typegoose/typegoose'
import { TaskStatuses } from '../../constants'
import { ITask } from '../../interfaces/task'
import { v4 } from 'uuid'

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
}

export const taskModel = getModelForClass(Task, {
    schemaOptions: {
        timestamps: true
    }
})