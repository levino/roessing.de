import React from 'react'
import 'globals.css'
import { NavBar } from 'components/NavBar'
import { Footer } from 'components/Footer'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Rössing',
  description: 'Alle Infos über Rössing',
  metadataBase: new URL('https://rössing.de'),
}
export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="dark:bg-slate-900">
        <div className="min-h-screen flex flex-col justify-between">
          <NavBar />
          <div className="flex-grow">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  )
}
