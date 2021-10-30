import { dropDb } from '../../../src/db/connection';
import { start, close } from '../../../src/httpService'


export const serviceHooks = () => {
    beforeAll(async () => {
        await start();
    })

    afterAll(async () => {
        await close();
    })

    beforeEach(async () => {
        await dropDb();
    })

    afterEach(async () => {
        await dropDb();
    })
}