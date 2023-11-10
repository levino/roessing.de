This is a MDX-file for an event with filename `2023-12-02-weihnachtsmarkt.mdx`.

```MDX
import { locations } from './locations'
import { organisations } from './organisations'
import weihnachtsmarkt from './images/weihnachtsmarkt.jpg'

export const data = {
  name: 'Rössinger Weihnachtsmarkt',
  startDate: '2023-12-02T15:00:00+01:00',
  endDate: '2023-12-02T20:00:00+01:00',
  location: locations.dorfgemeinschaftshausRoessing,
  organizer: organisations.dorfpflege,
  description:
    'Der alljährliche Weihnachtsmarkt in Rössing. Organisiert von Bürger*innen für Bürger*innen.',
  image: weihnachtsmarkt,
}

Endlich ist es wieder so weit: Rössing lädt zum Weihnachtsmarkt 2023 auf den Hof
des Dorfgemeinschaftshauses. Es gibt eine Vielzahl von Ständen, organisiert von
den Rössinger Vereinen, mit vielen köstlichen Speisen und Getränken. Auch für
Kinder wird es Unterhaltung geben. Wir freuen uns auf Ihren Besuch!
```

I give you this as an example for how I want event data to be structured. I
attach an xls which contains information about a different event. Please use
above template to create a new mdx file for the event described in the xls file.
Also please create a json object for data of the organizer of the event as a
JSON Schema Person. Please do not explain, just provide the content of the new
mdx file for the images event with a proper filename.
