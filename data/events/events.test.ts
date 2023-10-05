import { describe, expect, test } from 'bun:test'
import { EventData } from './event'
import { pipe } from 'fp-ts/function'
import * as E from 'fp-ts/Either'
import * as O from 'fp-ts/Option'

describe('Event parsing', () => {
  test('Parse simple event', () =>
    pipe(
      {
        name: 'Altpapiersammlung',
        og: {},
        location: {
          name: 'Hof Könneke',
          address: {
            streetAddress: 'Pfarrstr. 6',
            postalCode: '31171',
            addressLocality: 'Nordstemmen',
          },
        },
        startDate: '2023-07-08T09:00Z',
        endDate: '2023-07-08T12:00Z',
        slug: 'slug',
        description:
          'Die Fußballer*innen der SG Rössing/Barnten werden wieder Euer Altpapier entgegennehmen.\nEs wird nicht mehr eingesammelt!\nAchtung: Es wird ein Großraumcontainer auf dem Hof Könneke, in der Pfarrstr. 6, für das Altpapier bereitstehen. Wer keine Möglichkeit hat, das Altpapier zu bringen, kann sich bei Erich Könneke melden. Die Erlöse kommen allen Mannschaften der Fußballsparte zugute.',
      },
      EventData.decode,
      E.map(({ startDate }) => startDate),
      E.fold(
        () => expect.fail('Validation failed.'),
        (startDate) =>
          expect(startDate).toEqual(new Date('2023-07-08T09:00:00.000Z'))
      )
    ))
  test('Errors on invalid start date', () =>
    pipe(
      {
        name: 'Altpapiersammlung',
        og: {},
        location: {
          name: 'Hof Könneke',
          address: {
            streetAddress: 'Pfarrstr. 6',
            postalCode: '31171',
            addressLocality: 'Nordstemmen',
          },
        },
        slug: 'slug',
        startDate: 'invalid',
        endDate: '2023-07-08T12:00Z',
        description:
          'Die Fußballer*innen der SG Rössing/Barnten werden wieder Euer Altpapier entgegennehmen.\nEs wird nicht mehr eingesammelt!\nAchtung: Es wird ein Großraumcontainer auf dem Hof Könneke, in der Pfarrstr. 6, für das Altpapier bereitstehen. Wer keine Möglichkeit hat, das Altpapier zu bringen, kann sich bei Erich Könneke melden. Die Erlöse kommen allen Mannschaften der Fußballsparte zugute.',
      },
      EventData.decode,
      E.map(({ startDate }) => startDate),
      E.match(
        (errors) => expect(errors.length).toEqual(1),
        () => void 0
      )
    ))
  test('Contains a valid endDate', () =>
    pipe(
      {
        name: 'Altpapiersammlung',
        og: {},
        location: {
          name: 'Hof Könneke',
          address: {
            streetAddress: 'Pfarrstr. 6',
            postalCode: '31171',
            addressLocality: 'Nordstemmen',
          },
        },
        slug: 'slug',
        startDate: '2023-07-08T09:00Z',
        endDate: '2023-07-08T12:00Z',
        description:
          'Die Fußballer*innen der SG Rössing/Barnten werden wieder Euer Altpapier entgegennehmen.\nEs wird nicht mehr eingesammelt!\nAchtung: Es wird ein Großraumcontainer auf dem Hof Könneke, in der Pfarrstr. 6, für das Altpapier bereitstehen. Wer keine Möglichkeit hat, das Altpapier zu bringen, kann sich bei Erich Könneke melden. Die Erlöse kommen allen Mannschaften der Fußballsparte zugute.',
      },
      EventData.decode,
      E.map(({ endDate }) => endDate),
      E.match(
        () => expect.fail('Validation reports errors.'),
        O.match(console.log, (endDate) =>
          expect(endDate).toEqual(new Date('2023-07-08T12:00:00.000Z'))
        )
      )
    ))
})
