import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from 'ui';
import { cn } from 'ui/src';
import { AccordionItemProps } from '~/queries/accordion-item';

interface AccordionListProps {
  items: AccordionItemProps[];
}

export const AccordionList = ({ items }: AccordionListProps) => {
  return (
    <Accordion
      type="single"
      collapsible
      className={cn('gap-x-10', {
        'md:columns-2': items.length > 4,
      })}
    >
      {items.map((item) => (
        <AccordionItem key={item._key} value={item._key}>
          <AccordionTrigger className="text-xl">{item.title}</AccordionTrigger>
          <AccordionContent>{item.content}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
