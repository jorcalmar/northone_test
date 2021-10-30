"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTask = void 0;
const task_1 = require("../../db/models/task");
const createTask = async (createTaskInput) => {
    const createdTask = await task_1.taskModel.create(createTaskInput);
    return createdTask;
};
exports.createTask = createTask;
