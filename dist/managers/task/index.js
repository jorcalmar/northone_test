"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTaskById = exports.getTasksByUserId = exports.createTask = void 0;
const task_1 = require("../../db/models/task");
const createTask = async (createTaskInput) => {
    const createdTask = await task_1.taskModel.create(createTaskInput);
    return createdTask;
};
exports.createTask = createTask;
const getTasksByUserId = async (userId) => {
    const tasks = await task_1.taskModel.find({
        userId
    });
    return tasks;
};
exports.getTasksByUserId = getTasksByUserId;
const deleteTaskById = async (userId, taskId) => {
    await task_1.taskModel.remove({
        userId,
        _id: taskId
    });
};
exports.deleteTaskById = deleteTaskById;
