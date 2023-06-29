import React from 'react'
import Link from 'next/link'
export const Footer = () => {
  return (
    <footer className="py-4 bg-gray-800 text-white flex">
      <div className="text-sm hidden md:inline mx-auto">
        <span>© 2023 Levin Keller. Alle Rechte vorbehalten.</span>
        <span className="hidden md:inline"> | </span>
        <Link href="/imprint">Impressum</Link>
        <span className="hidden md:inline"> | </span>
        <Link href="https://github.com/levino/roessing.de" target="_blank">
          Code
        </Link>
      </div>
      <div className="text-sm text-center md:hidden mx-auto">
        <p>© 2023 Levin Keller. Alle Rechte vorbehalten.</p>
        <p>
          <Link href="/imprint">Impressum</Link>
        </p>
        <p>
          <Link href="https://github.com/levino/roessing.de" target="_blank">
            Code
          </Link>
        </p>
      </div>
    </footer>
  )
}
