import Link from 'next/link'

export const NavBar = () => {
  return (
    <div className="sticky top-0">
      <nav className="flex items-center justify-between p-4 bg-gray-800 text-white">
        <Link href="/" className="text-xl font-bold">
          Startseite
        </Link>
        <div>
          <Link href="/events" className="mr-4">
            Veranstaltungen
          </Link>
        </div>
      </nav>
    </div>
  )
}
