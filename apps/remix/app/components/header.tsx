import { useOutletContext } from '@remix-run/react'
import type { NavigationItemProps } from '~/queries/settings.ts'
import { NavigationItem } from './navigation-item.tsx'
import { SiteLogo } from '~/components/site-logo.tsx'

const Header = () => {
  const context = useOutletContext()
  const { primaryNav } = context.settings ?? {}

  return (
    <header className="h-20 flex items-center max-w-[1440px] px-10">
      <SiteLogo className="size-20" />
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
