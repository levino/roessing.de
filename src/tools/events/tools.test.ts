import { describe, expect, test } from 'vitest'
import { getMonth } from './index'

describe('tools', () => {
  test('getMonth', () => expect(getMonth(event.startDate)).toEqual('August'))
})

const event = {
  startDate: new Date('2023-08-10T18:00:00+02:00'),
}
