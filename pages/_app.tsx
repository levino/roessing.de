import type { AppProps } from 'next/app'
import '../globals.css'
import { ReactNode } from 'react'

export default ({ Component, pageProps }: AppProps): ReactNode => (
  <Component {...pageProps} />
)
