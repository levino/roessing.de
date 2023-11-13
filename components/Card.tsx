import React, { PropsWithChildren } from 'react'
import Image from 'next/image'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'

interface CardProps {
  imgSrc?: StaticImport
  imgAlt: string
  href: string
}
export const Card: React.FC<PropsWithChildren<CardProps>> = ({
  imgSrc,
  imgAlt,
  href,
  children,
}) => (
  <a
    href={href}
    rel="noopener noreferrer"
    target="_blank"
    className="flex flex-col max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
  >
    {imgSrc ? (
      <Image className="rounded-t-lg" src={imgSrc} alt={imgAlt} sizes="100vw" />
    ) : null}
    <div className="flex h-full flex-col justify-center gap-4 p-6">
      {children}
    </div>
  </a>
)
