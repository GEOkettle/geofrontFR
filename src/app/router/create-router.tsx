import { createRouter as createTanStackRouter } from '@tanstack/react-router'
import { routeTree } from '#/routeTree.gen'

import { getQueryProviderContext } from '#/app/providers/QueryProvider'

export function getRouter() {
  const router = createTanStackRouter({
    routeTree,

    context: getQueryProviderContext(),

    scrollRestoration: true,
    defaultPreload: 'intent',
    defaultPreloadStaleTime: 0,
  })

  return router
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}
