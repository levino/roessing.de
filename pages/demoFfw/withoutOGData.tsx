import Image from 'next/image'

const ConcertPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-lg bg-white p-8 rounded shadow-lg">
        <h1 className="text-3xl font-bold mb-4">
          Konzert des Feuerwehrmusikzugs
        </h1>
        <p className="text-lg mb-4">
          Der Feuerwehrmusikzug lädt Sie herzlich zu einem Konzert ein!
        </p>

        <div className="mb-4">
          <Image
            src="/images/demoFfw/music_corps.jpg"
            alt="Feuerwehrmusikzug"
            width={800}
            height={500}
            className="rounded"
          />
        </div>

        <p className="text-lg mb-4">
          Datum: 15. August 2023
          <br />
          Uhrzeit: 19:00 Uhr
          <br />
          Ort: Dorfgemeinschaftshaus Rössing
        </p>

        <div className="mb-4">
          <Image
            src="/images/demoFfw/location.jpg"
            alt="Dorfgemeinschaftshaus Rössing"
            width={800}
            height={500}
            className="rounded"
          />
        </div>

        <p className="text-lg">
          Kommen Sie vorbei und genießen Sie eine wunderbare musikalische
          Darbietung unseres Feuerwehrmusikzugs. Wir freuen uns auf Ihren
          Besuch!
        </p>
      </div>
    </div>
  )
}

export default ConcertPage
