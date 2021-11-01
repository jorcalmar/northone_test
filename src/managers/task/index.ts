import { taskModel, Task } from '../../db/models/task'
import { ITaskInput, ITask } from '../../interfaces/task'
import { validateCategory } from '../../managers'

import moment from 'moment'

import { TaskStatuses } from '../../constants'
import { errors } from '../../errors'
import config from 'config'

export const createTask = async (createTaskInput: ITaskInput): Promise<Task> => {
    const { categoryId, parentId, dueDate } = createTaskInput;

    if (categoryId) {
        await validateCategory(categoryId)
    }

    if (parentId) {
        const parent = await validateParent(parentId)
        await validateTaskDepth(parent)
        validateParentDate(parent, dueDate)
    }

    if (dueDate) {
        validateDate(dueDate)
    }

    const createdTask = await taskModel.create(createTaskInput);

    if (parentId) {
        await updateParent(parentId, createdTask.id)
    }

    console.log('Task created', { id: createdTask.id })

    return createdTask;
}

export const updateTask = async (taskId: string, updateTaskInput: Partial<ITask>): Promise<Task> => {
    const { categoryId, dueDate } = updateTaskInput;

    if (dueDate) {
        validateDate(dueDate)
    }

    if (categoryId) {
        await validateCategory(categoryId)
    }

    const updatedTask = await taskModel.findOneAndUpdate({
        id: taskId,
        deleted: false
    }, {
        $set: updateTaskInput
    }, {
        new: true
    });

    if (!updatedTask) throw errors.RESOURCE_NOT_FOUND

    if (dueDate) {
        await validateSubTasksDueDates(updatedTask)
    }

    console.log('Task updated', { id: updatedTask.id })

    return updatedTask
}

export const deleteTask = async (taskId: string): Promise<Task> => {
    const deletedTask = await taskModel.findOneAndUpdate({
        id: taskId,
        deleted: false
    }, {
        $set: {
            deleted: true
        }
    }, {
        new: true
    })

    if (!deletedTask) throw errors.RESOURCE_NOT_FOUND

    console.log('Task deleted', { id: taskId })

    return deletedTask
}

/**
 * Gets all tasks.
 * @returns List of tasks
 */
export const getTasks = async (query: any = { deleted: false }): Promise<Task[]> => {
    const tasks = await taskModel.find(query)

    if (tasks.length === 0) {
        throw errors.RESOURCE_NOT_FOUND
    }

    return tasks
}

export const getOneTask = async (taskId: string): Promise<ITask> => {
    const task = await taskModel.findOne({
        id: taskId,
        deleted: false
    })

    if (!task) throw errors.RESOURCE_NOT_FOUND

    return task
}

export const validateParent = async (parentId: string): Promise<ITask> => {
    const parent = await taskModel.findOne({ id: parentId });

    if (!parent) throw errors.PARENT_NOT_FOUND

    return parent
}

export const updateParent = async (parentId: string, createdTaskId: string): Promise<ITask | null> => taskModel.findOneAndUpdate({
    id: parentId
}, {
    $push: {
        subTasksIds: createdTaskId
    }
}, {
    new: true
})

export const updateDueTasks = async () => {
    const todaysDate = moment().format('YYYY-MM-DD')

    await taskModel.updateMany({
        status: { $ne: TaskStatuses.DONE },
        dueDate: todaysDate
    }, {
        $set: {
            status: TaskStatuses.EXPIRED
        }
    })
}

/** Checks recursively how deep in the tree the task is.
 * If the task has no parent
 * @subTask - subTasks that counts upwards in the tree.
 */
export const getSubTaskDepth = async (task: ITask, currentLevel: number) => {
    if (currentLevel + 1 > Number(config.get('MAX_NESTED_LEVEL'))) {
        console.log('Level reached is', currentLevel)
        throw errors.MAX_NESTED_LEVEL_REACHED
    }

    if (task.parentId) {
        const parent = await taskModel.findOne({ id: task.parentId }) as ITask
        return 1 + await getSubTaskDepth(parent, currentLevel + 1)
    } else {
        return 0
    }
}

export const validateTaskDepth = async (task: ITask): Promise<number> => {
    return await getSubTaskDepth(task, 0)
}

export const validateDate = (dueDate: string) => {
    const dueDateMoment = moment(dueDate)
    const today = moment()

    if (dueDateMoment.diff(today, 'days') < 0) {
        throw errors.INVALID_DUE_DATE
    }
}

export const validateParentDate = (parent: ITask, dueDate: string) => {
    const parentDueDate = moment(parent.dueDate)
    const dueDateMoment = moment(dueDate)

    if (dueDateMoment.diff(parentDueDate, 'days') > 0) {
        throw errors.INVALID_DUE_DATE
    }
}

export const updateSubTasksDates = async (taskId: string, newDueDate: string) => {
    const task = await taskModel.findOne({ id: taskId })

    const taskDueDateMoment = moment(task?.dueDate)
    const newDueDateMoment = moment(newDueDate)

    const subTasksIds = task?.subTasksIds

    if (taskDueDateMoment.diff(newDueDateMoment, 'days') > 0) {
        await taskModel.findOneAndUpdate({
            id: task?.id,
            deleted: false
        }, {
            $set: {
                dueDate: newDueDate
            }
        })
    }

    if (subTasksIds) {
        const promises = subTasksIds.map(subTaskId => {
            return updateSubTasksDates(subTaskId, newDueDate)
        })

        return Promise.all(promises)
    }
}

export const validateSubTasksDueDates = async (task: ITask) => {
    const subTasksIds = task.subTasksIds
    const newDueDate = task.dueDate

    if (subTasksIds) {
        const promises = subTasksIds.map(subTaskId => {
            return updateSubTasksDates(subTaskId, newDueDate)
        })

        return Promise.all(promises)
    }
}