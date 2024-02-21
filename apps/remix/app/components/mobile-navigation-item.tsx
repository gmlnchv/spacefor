import React from 'react';
import { NavLink } from '@remix-run/react';
import type { NavigationItemProps } from '~/queries/settings.ts';
import { cn } from 'ui';

const MobileNavigationItem = React.forwardRef<
  HTMLAnchorElement,
  NavigationItemProps
>((props, ref) => {
  if (props.link.isExternal) {
    return (
      <a
        href={props.link.href as string}
        target="_blank"
        rel="noopener noreferrer"
        ref={ref}
      >
        {props.label}
      </a>
    );
  }

  return (
    <NavLink to={props.link.href as string} ref={ref}>
      {props.label}
    </NavLink>
  );
});

MobileNavigationItem.displayName = 'MobileNavigationItem';

export { MobileNavigationItem };
