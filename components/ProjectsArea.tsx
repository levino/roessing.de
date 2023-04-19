import React, { PropsWithChildren } from 'react'
export const ProjectsArea: React.FC<PropsWithChildren> = ({ children }) => (
  <div className="max-w-md mx-auto md:max-w-2xl gap-10 grid grid-cols-1">
    {children}
  </div>
)
