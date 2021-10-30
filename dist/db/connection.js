"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeDb = exports.dropDb = exports.dbConnect = void 0;
const mongoose_1 = require("mongoose");
let dbInstance;
const dbConnect = async (uri) => {
    if (!dbInstance) {
        dbInstance = await (0, mongoose_1.connect)(uri);
    }
    console.log(`Connected to mongo: ${uri}`);
    return dbInstance;
};
exports.dbConnect = dbConnect;
const dropDb = async () => {
    await dbInstance.connection.dropDatabase();
};
exports.dropDb = dropDb;
const closeDb = async () => {
    await dbInstance.connection.close();
};
exports.closeDb = closeDb;
