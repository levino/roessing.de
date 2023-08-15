import React, { PropsWithChildren } from 'react'
import Image from 'next/image'
import heroImage from 'public/images/hero.jpg'
export const Jumbotron: React.FC<PropsWithChildren> = ({ children }) => (
  <section className="flex relative h-[50vh] align-middle">
    <div className="absolute overflow-hidden h-[50vh] h-full w-full -z-10">
      <Image
        alt="Blumenwiese"
        src={heroImage}
        placeholder="blur"
        quality={100}
        fill
        sizes="100vw"
        style={{
          objectFit: 'cover',
        }}
        className="brightness-50"
      />
    </div>
    {children}
  </section>
)
