import { NavBar } from 'components/NavBar'
import { DefaultSeo } from 'next-seo'
import type { AppProps } from 'next/app'
import 'tailwindcss/tailwind.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo title="Rössing" description="Alle Infos über Rössing" />
      <NavBar />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
