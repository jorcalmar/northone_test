import { dbConnect, dropDb, closeDb } from '../../../src/db/connection'
import config from 'config'

export const dbHooks = () => {
    beforeAll(async () => {
        await dbConnect(config.get('MONGO_URL'));
    })

    afterEach(async () => {
        await dropDb();
    })

    afterAll(async () => {
        await closeDb();
    })
}
