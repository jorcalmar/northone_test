"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTaskRoute = void 0;
const managers_1 = require("../../managers");
const createTaskRoute = async (req, res, next) => {
    try {
        console.log('creating', req.body);
        const userId = req.userId;
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
    }
};
exports.createTaskRoute = createTaskRoute;
