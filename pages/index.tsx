import React from 'react'
import { Project } from 'components/Project'
import { ProjectsArea } from 'components/ProjectsArea'
import { Jumbotron } from 'components/Jumbotron'

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

    <ProjectsArea>
      <Project
        imageSource="/images/dorfpflege.jpg"
        title="Die Dorfpflege"
        subtitle="Rössings Natur und Grünflächen in Schuss halten"
        linkUrl="https://www.dorfpflege-roessing.de"
      >
        <p>
          Die Dorfpflege ist ein Verein, der sich um die Streuobstwiese der
          Gemeinde kümmert, gemeinsam Müll sammelt und sich um die
          Pflegemaßnahmen der Grünflächen und -bereiche kümmert. Außerdem
          organisiert die Dorfpflege das Osterfeuer und den Weihnachtsmarkt von
          Rössing.
        </p>
      </Project>
      <Project
        imageSource="/images/ffw.jpg"
        title="Die Freiwillige Feuerwehr"
        subtitle="Retten, sichern und bergen in und um Rössing"
        linkUrl="https://www.ff-roessing.de"
      >
        <p> Natürlich hat Rössing auch eine freiwillige Feuerwehr!</p>
      </Project>
    </ProjectsArea>
  </>
)

export default LandingPage