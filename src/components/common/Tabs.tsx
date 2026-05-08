import type * as React from 'react'

import { SelectableBadge } from '#/components/common/Badge'
import { cn } from '#/shared/lib/utils'

type TabItem = {
  href?: string
  id: string
  label: string
}

type TabsNavProps = React.HTMLAttributes<HTMLDivElement> & {
  activeId: string
  items: TabItem[]
  variant?: 'simple' | 'underline'
}

function TabsNav({
  activeId,
  className,
  items,
  variant = 'simple',
  ...props
}: TabsNavProps) {
  const wrapperClassName =
    variant === 'underline'
      ? 'relative'
      : 'border-b border-gray-200 dark:border-gray-700/60'

  return (
    <div className={cn(wrapperClassName, className)} {...props}>
      {variant === 'underline' ? (
        <div
          className="absolute bottom-0 h-px w-full bg-gray-200 dark:bg-gray-700/60"
          aria-hidden="true"
        />
      ) : null}
      <ul className="relative flex flex-nowrap overflow-x-scroll text-sm font-medium no-scrollbar -mx-4 sm:-mx-6 lg:-mx-8">
        {items.map((item) => {
          const selected = item.id === activeId
          return (
            <li
              key={item.id}
              className={cn(
                'mr-6 last:mr-0 first:pl-4 last:pr-4 sm:first:pl-6 sm:last:pr-6 lg:first:pl-8 lg:last:pr-8',
                variant === 'underline' ? '' : 'pb-3',
              )}
            >
              <a
                className={cn(
                  'whitespace-nowrap',
                  variant === 'underline' && 'block pb-3',
                  selected
                    ? 'text-violet-500'
                    : 'text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300',
                  variant === 'underline' &&
                    selected &&
                    'border-b-2 border-violet-500',
                )}
                href={item.href ?? '#0'}
                aria-current={selected ? 'page' : undefined}
              >
                {item.label}
              </a>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

type TabPillsProps = React.HTMLAttributes<HTMLUListElement> & {
  activeId: string
  items: TabItem[]
}

function TabPills({ activeId, className, items, ...props }: TabPillsProps) {
  return (
    <ul className={cn('flex flex-wrap -m-1', className)} {...props}>
      {items.map((item) => (
        <li key={item.id} className="m-1">
          <SelectableBadge selected={item.id === activeId}>
            {item.label}
          </SelectableBadge>
        </li>
      ))}
    </ul>
  )
}

export { TabsNav, TabPills }
