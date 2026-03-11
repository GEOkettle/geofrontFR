import { Outlet, createFileRoute, useRouterState } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

import Header from '#/features/seed/partials/Header'
import Sidebar from '#/features/seed/partials/Sidebar'

export const Route = createFileRoute('/_app')({
  component: MosaicAppShell,
})

function MosaicAppShell() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  })
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.documentElement.style.scrollBehavior = ''
    setSidebarOpen(false)
  }, [pathname])

  return (
    <div className="flex h-[100dvh] overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <Outlet />
      </div>
    </div>
  )
}
