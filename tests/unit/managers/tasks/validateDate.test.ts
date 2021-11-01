import { validateDate } from '../../../../src/managers'
import { errors } from '../../../../src/errors'

import moment from 'moment'

describe('Validates task date manager', () => {
    it('tests valid date', () => {
        const dueDate = moment().add(5, 'days').format('YYYY-MM-DD')

        expect(() => validateDate(dueDate)).not.toThrow()
    })

    it('tests invalid date', () => {
        const dueDate = moment().subtract(1, 'days').format('YYYY-MM-DD')

        expect(() => validateDate(dueDate)).toThrow(errors.INVALID_DUE_DATE)
    })
})