import React from 'react'
import Image from 'next/image'
import { Card } from 'flowbite-react'
interface ProjectProps {
  imageSource: string
  title: string
  subtitle: string
  description: string
  linkUrl: string
}

export const Project: React.FC<React.PropsWithChildren<ProjectProps>> = ({
  imageSource,
  title,
  subtitle,
  children,
  linkUrl,
}) => (
  <Card
    href={linkUrl}
    rel="noopener noreferrer"
    target="_blank"
    horizontal
    imgSrc={imageSource}
  >
    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
      {title}
    </h5>
    <p className="font-normal text-gray-700 dark:text-gray-400">{subtitle}</p>
    <span className="mt-2 text-slate-500">{children}</span>
  </Card>
)
