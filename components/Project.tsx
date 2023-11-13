import React from 'react'
import { Card } from './Card'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'

interface ProjectProps {
  imageSource?: StaticImport
  title: string
  subtitle: string
  linkUrl: string
}

export const Project: React.FC<React.PropsWithChildren<ProjectProps>> = ({
  imageSource,
  title,
  subtitle,
  children,
  linkUrl,
}) => (
  <Card href={linkUrl} imgSrc={imageSource} imgAlt="event image">
    <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
      {title}
    </h2>
    <p className="font-normal text-gray-700 dark:text-gray-400">{subtitle}</p>
    <span className="mt-2 text-slate-500">{children}</span>
  </Card>
)
