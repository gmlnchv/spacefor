import { Link, useOutletContext } from '@remix-run/react';
import type { NavigationItemProps } from '~/queries/global.ts';
import { NavigationItem } from './navigation-item.tsx';
import { SiteLogo } from '~/components/site-logo.tsx';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from 'ui';
import { MobileNav } from './mobile-nav.tsx';

const variants = cva(['h-20'], {
  variants: {
    colorScheme: {
      dark: ['bg-black text-white'],
      light: ['bg-cararra-100 text-black'],
    },
  },
  defaultVariants: {
    colorScheme: 'dark',
  },
});

interface HeaderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof variants> {}

const Header = ({ colorScheme }: HeaderProps) => {
  const context = useOutletContext();
  const { primaryNav } = context.globalData.settings ?? {};

  return (
    <header className={cn(variants({ colorScheme }))}>
      <div className="flex items-center justify-between px-5 max-w-[1360px] mx-auto">
        <Link to={'/'} aria-label={'Go to the home page'}>
          {/* SiteLogo inherits the color scheme from Header */}
          <SiteLogo colorScheme={colorScheme} className="size-20" />
        </Link>

        <div className="md:hidden">
          <MobileNav />
        </div>

        {Boolean(primaryNav?.items?.length) && (
          <nav className="md:flex gap-x-10 hidden">
            {primaryNav.items.map((item: NavigationItemProps) => (
              <NavigationItem key={item._key} {...item} />
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};

export { Header };
