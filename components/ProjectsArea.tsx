import React, { PropsWithChildren } from 'react'
export const ProjectsArea: React.FC<PropsWithChildren> = ({ children }) => (
  <div className="max-w-md mx-auto bg-white dark:bg-slate-800 overflow-hidden md:max-w-2xl">
    {children}
  </div>
)
