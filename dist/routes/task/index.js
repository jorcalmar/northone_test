"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTaskRoute = exports.getTasksRoute = exports.createTaskRoute = void 0;
const managers_1 = require("../../managers");
const createTaskRoute = async (req, res, next) => {
    try {
        const userId = req['userId'];
        const createTaskInput = {
            ...req.body,
            userId
        };
        const createdTask = await (0, managers_1.createTask)(createTaskInput);
        res.send(201, {
            info: 'Task created',
            data: createdTask
        });
        return next();
    }
    catch (error) {
        console.log('Error creating task', { error });
        res.send(500, {
            error
        });
        return next();
    }
};
exports.createTaskRoute = createTaskRoute;
const getTasksRoute = async (req, res, next) => {
    const userId = req['userId'];
    try {
        const tasks = await (0, managers_1.getTasksByUserId)(userId);
        res.send(200, {
            info: 'Tasks retrieved',
            data: tasks
        });
        return next();
    }
    catch (error) {
        console.log('Error retrieving tasks', error);
        res.send(500, { error });
        return next();
    }
};
exports.getTasksRoute = getTasksRoute;
const deleteTaskRoute = async (req, res, next) => {
    const taskId = req.params['taskId'];
    const userId = req['userId'];
    try {
        await (0, managers_1.deleteTaskById)(userId, taskId);
        res.send(200, {
            info: 'Task deleted'
        });
        return next();
    }
    catch (error) {
        console.log('Error deleting task', { error });
        res.send(500, {
            error
        });
        return next();
    }
};
exports.deleteTaskRoute = deleteTaskRoute;
