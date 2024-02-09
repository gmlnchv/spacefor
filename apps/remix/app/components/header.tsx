import { useOutletContext } from '@remix-run/react'
import type { NavigationItemProps } from '~/queries/settings.ts'
import { NavigationItem } from './navigation-item.tsx'

const Header = () => {
  const context = useOutletContext()
  const { primaryNav } = context.settings

  return (
    <header className="container py-4">
      <h1>Shiv</h1>

      {Boolean(primaryNav?.items.length) && (
        <nav>
          {primaryNav.items.map((item: NavigationItemProps) => (
            <NavigationItem key={item._key} {...item} />
          ))}
        </nav>
      )}
    </header>
  )
}

export { Header }
