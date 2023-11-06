import React from 'react'
import { Project } from 'components/Project'
import { Jumbotron } from 'components/Jumbotron'
import dorfpflegeImage from '../public/images/dorfpflege.jpg'
import ffwImage from '../public/images/ffw.jpg'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Rössing',
  description: 'Alle Infos über Rössing',
}
const LandingPage = () => (
  <>
    <Jumbotron>
      <div className="m-auto max-w-2xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-slate-100 sm:text-6xl">
          Willkommen in Rössing
        </h1>
        <p className="mt-6 text-lg leading-8 text-slate-300">
          Rössing ist ein Dorf in Niedersachsen und gehört zur Gemeinde
          Nordstemmen im Landkreis Hildesheim. Wir haben im Moment etwa 1600
          Einwohner:innen und zahlreiche Vereine und Organe. Hier findet sich
          eine Übersicht.
        </p>
      </div>
    </Jumbotron>

    <div className="container max-w-7xl px-4 mx-auto gap-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 py-32">
      <Project
        imageSource={dorfpflegeImage}
        title="Die Dorfpflege"
        subtitle="Rössings Natur und Grünflächen in Schuss halten"
        linkUrl="https://www.dorfpflege-roessing.de"
      >
        <p className="dark:text-slate-200">
          Die Dorfpflege ist ein Verein, der sich um die Streuobstwiese im Dorf
          kümmert, gemeinsam Müll sammelt und sich um die Pflegemaßnahmen der
          Grünflächen und -bereiche kümmert. Außerdem organisiert die Dorfpflege
          das Osterfeuer und den Weihnachtsmarkt von Rössing.
        </p>
      </Project>
      <Project
        imageSource={ffwImage}
        title="Die Freiwillige Feuerwehr"
        subtitle="Retten, sichern und bergen in und um Rössing"
        linkUrl="https://www.ff-roessing.de"
      >
        <p className="dark:text-slate-200">
          Natürlich hat Rössing auch eine freiwillige Feuerwehr!
        </p>
      </Project>
    </div>
  </>
)

export default LandingPage
