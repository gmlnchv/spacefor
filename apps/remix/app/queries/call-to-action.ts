import { q, type TypeFromSelection, type Selection } from 'groqd';
import { linkSelection } from './link';

export const callToActionSelection = {
  label: q.string(),
  link: q('link').grab(linkSelection),
} satisfies Selection;

export type CallToActionProps = TypeFromSelection<typeof callToActionSelection>;
