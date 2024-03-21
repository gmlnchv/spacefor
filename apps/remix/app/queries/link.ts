import { q, type Selection } from 'groqd';

export const linkSelection = {
  isExternal: q('type == "external"'),
  href: q.select({
    'type == "internal"': q('internal').deref().grabOne('slug.current'),
    'type == "external"': q('external'),
  }),
} satisfies Selection;
