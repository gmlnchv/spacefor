import { useOutletContext } from '@remix-run/react';
import {
  Sheet,
  SheetTrigger,
  Button,
  SheetContent,
  SheetHeader,
  SheetClose,
} from 'ui';
import { SiteLogo } from './site-logo';
import { Container } from './container';
import { NavigationItemProps } from '~/queries/global';
import { MobileNavigationItem } from './mobile-navigation-item';

export const MobileNav = () => {
  const context = useOutletContext();
  const { mobileNav } = context.globalData.settings ?? {};

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          className="text-inherit size-12 inline-flex items-center justify-center p-2 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
          aria-label="Open the mobile navigation menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={31}
            height={10}
            fill="none"
          >
            <path
              fill="currentColor"
              d="M.086.85h30v2h-30zM.086 7.85h30v2h-30z"
            />
          </svg>
        </button>
      </SheetTrigger>

      <SheetContent className="shadow-none border-0 p-0 bg-cararra-100 w-full">
        <Container>
          <SheetHeader className="flex-row items-center justify-between">
            <SiteLogo colorScheme="light" className="size-20" />

            <SheetClose asChild>
              <button
                aria-label="Close the mobile navigation menu"
                className="size-12 inline-flex items-center justify-center p-2 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={21}
                  height={21}
                  fill="none"
                >
                  <path
                    className="fill-black"
                    d="M2.333 20.066.292 18.083l8.166-7.933L.292 2.216 2.333.233 10.5 8.166 18.667.233l2.041 1.983-8.166 7.934 8.166 7.933-2.041 1.983-8.167-7.933-8.167 7.933Z"
                  />
                </svg>
              </button>
            </SheetClose>
          </SheetHeader>

          <nav className="mt-16 grid text-3xl font-serif divide-y divide-black *:py-5">
            {mobileNav.items.map((item: NavigationItemProps) => (
              <MobileNavigationItem key={item._key} {...item} />
            ))}
          </nav>
        </Container>
      </SheetContent>
    </Sheet>
  );
};
