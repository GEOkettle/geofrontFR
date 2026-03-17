import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/react-router'
import type { ReactNode } from 'react'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import type { QueryClient } from '@tanstack/react-query'

import { THEME_INIT_SCRIPT } from '#/app/config/theme'
import { publicEnv } from '#/app/config/public-env'
import RootErrorPage from '#/components/common/RootErrorPage'
import AppProvider from '#/app/providers/AppProvider'
import TanStackQueryDevtools from '#/app/providers/query-devtools'
import PageNotFound from '#/features/seed/pages/utility/PageNotFound'

import appCss from '#/app/styles/global.css?url'

interface MyRouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: publicEnv.VITE_APP_NAME,
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),
  errorComponent: RootErrorPage,
  notFoundComponent: PageNotFound,
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <HeadContent />
      </head>
      <body
        suppressHydrationWarning
        className="bg-gray-50 font-sans antialiased text-gray-900 [overflow-wrap:anywhere] selection:bg-[rgba(79,184,178,0.24)] dark:bg-gray-950 dark:text-gray-100"
      >
        <AppProvider>
          {children}
          <TanStackDevtools
            config={{
              position: 'bottom-right',
            }}
            plugins={[
              {
                name: 'Tanstack Router',
                render: <TanStackRouterDevtoolsPanel />,
              },
              TanStackQueryDevtools,
            ]}
          />
        </AppProvider>
        <Scripts />
      </body>
    </html>
  )
}
