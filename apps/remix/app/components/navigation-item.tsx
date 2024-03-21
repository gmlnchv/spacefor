import React from 'react';
import { NavLink } from '@remix-run/react';
import type { NavigationItemProps } from '~/queries/global';
import { cn } from 'ui';

const NavigationItem = React.forwardRef<HTMLAnchorElement, NavigationItemProps>(
  (props, ref) => {
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
      <NavLink
        to={props.link.href as string}
        ref={ref}
        className={({ isActive }) =>
          cn('underline underline-offset-[3px] decoration-transparent', {
            'decoration-current -translate-y-0.5': isActive,
          })
        }
      >
        {props.label}
      </NavLink>
    );
  }
);

NavigationItem.displayName = 'NavigationItem';

export { NavigationItem };
