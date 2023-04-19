import React from 'react'
import Image from 'next/image'

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
  <a
    href={linkUrl}
    rel="noopener noreferrer"
    target="_blank"
    className="m-20 block max-w-md mx-auto bg-white dark:bg-slate-600 rounded-xl shadow-md overflow-hidden md:max-w-2xl"
  >
    <div className="md:flex">
      <div className="md:shrink-0">
        <Image
          width={500}
          height={500}
          className="h-48 w-full object-cover md:h-full md:w-48"
          src={imageSource}
          alt="Leute von der Dorfpflege auf der Streuobstwiese mit Anhänger voller Äpfel"
        />
      </div>
      <div className="p-8">
        <div className="uppercase tracking-wide text-sm text-indigo-500 dark:text-white font-semibold">
          {title}
        </div>
        <div className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">
          {subtitle}
        </div>
        <span className="mt-2 text-slate-500">{children}</span>
      </div>
    </div>
  </a>
)
