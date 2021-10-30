import { prop, getModelForClass } from '@typegoose/typegoose'
import { TaskStatuses } from '../../constants'
import { ITask } from '../../interfaces/task'

class Task implements ITask {
    @prop({ required: true })
    title: string

    @prop({ required: true })
    description: string

    @prop({ default: TaskStatuses.PENDING })
    status: TaskStatuses

    @prop({ default: new Date() })
    dueDate: Date

    @prop({ required: true, index: true })
    userId: string

    @prop({ required: true })
    subTasks: [ITask]
}

export const taskModel = getModelForClass(Task, { schemaOptions: { timestamps: true } })