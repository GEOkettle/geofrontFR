import type * as React from 'react'

import { cn } from '#/shared/lib/utils'

type BreadcrumbItem = {
  href?: string
  label: string
}

type BreadcrumbProps = React.HTMLAttributes<HTMLElement> & {
  items: BreadcrumbItem[]
  separator?: 'slash' | 'dot' | 'chevron'
}

function Breadcrumb({
  className,
  items,
  separator = 'slash',
  ...props
}: BreadcrumbProps) {
  return (
    <nav
      className={cn('inline-flex', className)}
      aria-label="Breadcrumb"
      {...props}
    >
      <ol className="inline-flex flex-wrap text-sm font-medium">
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          const content =
            item.href && !isLast ? (
              <a
                className="text-gray-500 hover:text-violet-500 dark:text-gray-400 dark:hover:text-violet-500"
                href={item.href}
              >
                {item.label}
              </a>
            ) : (
              <span className="text-gray-500 dark:text-gray-400">
                {item.label}
              </span>
            )

          if (separator === 'chevron') {
            return (
              <li key={`${item.label}-${index}`} className="flex items-center">
                {content}
                {!isLast ? (
                  <svg
                    className="mx-3 fill-current text-gray-400 dark:text-gray-600"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    aria-hidden="true"
                  >
                    <path d="M6.6 13.4L5.2 12l4-4-4-4 1.4-1.4L12 8z" />
                  </svg>
                ) : null}
              </li>
            )
          }

          const separatorText = separator === 'dot' ? '·' : '/'

          return (
            <li
              key={`${item.label}-${index}`}
              className={cn(
                `after:px-2 after:text-gray-400 dark:after:text-gray-600 after:content-['${separatorText}']`,
                isLast && 'after:hidden',
              )}
            >
              {content}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export { Breadcrumb }
