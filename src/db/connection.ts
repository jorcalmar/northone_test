import { Mongoose, connect } from 'mongoose'

let dbInstance: Mongoose

export const dbConnect = async (uri: string): Promise<Mongoose> => {
    if (!dbInstance) {
        dbInstance = await connect(uri);
    }

    console.log(`Connected to mongo: ${uri}`);
    return dbInstance;
}

export const dropDb = async () => {
    await dbInstance.connection.dropDatabase()
}

export const closeDb = async () => {
    await dbInstance.connection.close()
}