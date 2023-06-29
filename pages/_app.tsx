import { NavBar } from 'components/NavBar'
import { Footer } from 'components/Footer'
import { DefaultSeo } from 'next-seo'
import type { AppProps } from 'next/app'
import 'tailwindcss/tailwind.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <DefaultSeo title="Rössing" description="Alle Infos über Rössing" />
      <NavBar />
      <div className="flex-grow">
        <Component {...pageProps} />
      </div>
      <Footer />
    </div>
  )
}

export default MyApp
