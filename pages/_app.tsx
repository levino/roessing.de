import React from 'react'
import type { AppProps } from 'next/app'
import '../globals.css'
import { ReactNode } from 'react'

const Wrapper = ({ Component, pageProps }: AppProps): ReactNode => (
  <Component {...pageProps} />
)

export default Wrapper
