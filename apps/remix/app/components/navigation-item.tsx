import React from 'react'
import { Link } from '@remix-run/react'
import type { NavigationItemProps } from '~/queries/settings.ts'

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
      )
    }

    return (
      <Link to={props.link.href as string} ref={ref}>
        {props.label}
      </Link>
    )
  },
)

NavigationItem.displayName = 'NavigationItem'

export { NavigationItem }
