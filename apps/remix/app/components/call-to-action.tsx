import React from 'react';
import { Link } from '@remix-run/react';
import { buttonVariants, cn } from 'ui';
import type { CallToActionProps } from '~/queries/call-to-action';

const CallToAction = React.forwardRef<HTMLAnchorElement, CallToActionProps>(
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
      <Link
        to={props.link.href as string}
        ref={ref}
        className={cn(buttonVariants({ variant: 'inverse' }))}
      >
        {props.label}
      </Link>
    );
  }
);

CallToAction.displayName = 'CallToAction';

export { CallToAction };
