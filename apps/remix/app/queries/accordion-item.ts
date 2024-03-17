import { q, type TypeFromSelection, type Selection } from 'groqd';

export const accordionItemSelection = {
  _key: q.string(),
  title: q.string(),
  content: q.string(),
} satisfies Selection;

export type AccordionItemProps = TypeFromSelection<
  typeof accordionItemSelection
>;
