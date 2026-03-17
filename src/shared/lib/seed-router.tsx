//
import { Link as TanStackLink, useRouterState } from '@tanstack/react-router'
import type { LinkProps as TanStackLinkProps } from '@tanstack/react-router'

type SimpleLinkProps = Omit<TanStackLinkProps, 'params' | 'search'> & {
  to: string
}

type NavLinkProps = SimpleLinkProps & {
  end?: boolean
  className?: string | ((state: { isActive: boolean }) => string)
}

export function Link(props: SimpleLinkProps) {
  return <TanStackLink {...props} />
}

export function useLocation() {
  return useRouterState({
    select: (state) => state.location,
  })
}

export function NavLink({ to, end = false, className, ...rest }: NavLinkProps) {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  })

  const isActive =
    pathname === to ||
    (!end && to !== '/' && pathname.startsWith(`${to}/`)) ||
    (!end && to === '/' && pathname === '/')

  const resolvedClassName =
    typeof className === 'function' ? className({ isActive }) : className

  return <TanStackLink {...rest} to={to} className={resolvedClassName} />
}
