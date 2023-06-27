import ConcertPageWithoutOGData from './withoutOGData'

import Head from 'next/head'

const ConcertPage = () => {
  return (
    <div className="container mx-auto p-8">
      <Head>
        <title>Konzert des Feuerwehrmusikzugs</title>
        <meta property="og:title" content="Konzert des Feuerwehrmusikzugs" />
        <meta
          property="og:description"
          content="Der Feuerwehrmusikzug lädt Sie herzlich zu einem Konzert ein!"
        />
        <meta property="og:image" content="/images/demoffw/music_corps.jpg" />
        <meta property="og:image:alt" content="Feuerwehrmusikzug" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://example.com/concert-page" />
        <meta property="og:site_name" content="Feuerwehrmusikzug" />
        <meta property="og:locale" content="de_DE" />
        <meta property="og:article:author" content="Feuerwehrmusikzug" />
        <meta
          property="og:article:published_time"
          content="2023-08-15T19:00:00+02:00"
        />
        <meta property="og:article:section" content="Konzerte" />
        <meta property="og:article:tag" content="Feuerwehrmusikzug" />
      </Head>

      <ConcertPageWithoutOGData />
    </div>
  )
}

export default ConcertPage
