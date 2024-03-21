import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format, parseISO, isSameMonth, isPast } from 'date-fns';
import { EventProps } from '~/queries/event';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from 'ui';
import { Container } from './container';
import { cn } from 'ui';
import { Image } from './image';
import { SpaceIcon } from './space-icon';

interface EventListProps {
  events: EventProps[];
}

const AnimatedTableRow = motion(TableRow);

const EventRow = React.forwardRef<HTMLTableRowElement, { event: EventProps }>(
  ({ event }, ref) => {
    const { start_date, end_date, retailer, space } = event;
    const parsedStartDate = parseISO(start_date.toString());
    const parsedEndDate = parseISO(end_date.toString());

    const eventIsSameMonth = isSameMonth(parsedStartDate, parsedEndDate);
    const eventIsPast = isPast(parsedEndDate);

    const formattedDate = eventIsSameMonth
      ? `${format(parsedStartDate, 'd')} \u2013 ${format(
          parsedEndDate,
          'd MMM yyyy'
        )}`
      : `${format(parsedStartDate, 'd MMM yyyy')} \u2013 ${format(
          parsedEndDate,
          'd MMM yyyy'
        )}`;

    return (
      <AnimatedTableRow
        ref={ref}
        initial={{ opacity: 0 }}
        animate={{ opacity: eventIsPast ? 0.5 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className={cn('text-white text-lg border-b-0 border-t', {
          'opacity-50 border-white/50': eventIsPast,
          'border-white': !eventIsPast,
        })}
      >
        <TableCell className="px-0 h-24 w-1/4">
          {eventIsPast ? 'Finished' : formattedDate}
        </TableCell>
        <TableCell className="font-serif h-24 text-xl px-2">
          <div className="flex items-center gap-x-5">
            <Image
              src={retailer.image.asset.url}
              layout="fixed"
              height={60}
              width={80}
              alt={retailer.title}
            />
            {retailer.title}
          </div>
        </TableCell>
        <TableCell className="px-0 h-24 w-[120px]">
          <div className="flex items-center gap-x-2.5 max-w-[120px]">
            <SpaceIcon width={20} />
            {space.title}
          </div>
        </TableCell>
      </AnimatedTableRow>
    );
  }
);

const EventRowNarrow = React.forwardRef<
  HTMLTableRowElement,
  { event: EventProps }
>(({ event }, ref) => {
  const { start_date, end_date, retailer, space } = event;
  const parsedStartDate = parseISO(start_date.toString());
  const parsedEndDate = parseISO(end_date.toString());

  const eventIsSameMonth = isSameMonth(parsedStartDate, parsedEndDate);
  const eventIsPast = isPast(parsedEndDate);

  const formattedDate = eventIsSameMonth
    ? `${format(parsedStartDate, 'd')}–${format(parsedEndDate, 'd MMM yyyy')}`
    : `${format(parsedStartDate, 'd MMM yyyy')} – ${format(
        parsedEndDate,
        'd MMM yyyy'
      )}`;

  return (
    <AnimatedTableRow
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: eventIsPast ? 0.5 : 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className={cn('text-white border-b-0 border-t', {
        'opacity-50 border-white/50': eventIsPast,
        'border-white': !eventIsPast,
      })}
    >
      <TableCell className="px-0 py-3.5 space-y-4">
        <p>{eventIsPast ? 'Finished' : formattedDate}</p>
        <p>{retailer.title}</p>

        <div className="flex items-center gap-x-2.5">
          <SpaceIcon width={14} />
          {space.title}
        </div>
      </TableCell>
      <TableCell className="font-serif text-xl px-0 py-3.5 w-20 align-top">
        <Image
          src={retailer.image.asset.url}
          layout="fixed"
          height={60}
          width={80}
          alt={retailer.title}
          className="flex justify-center"
        />
      </TableCell>
    </AnimatedTableRow>
  );
});

const EventList = ({ events }: EventListProps) => {
  const [limit, setLimit] = React.useState(5);

  const latestEvents = events.slice(0, limit);
  return (
    <section className="py-10 md:py-24">
      <Container>
        {/* Wide */}
        <Table className="max-sm:hidden">
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/4 sr-only">Dates</TableHead>
              <TableHead className="sr-only">Retailer</TableHead>
              <TableHead className="text-right sr-only w-[140px]">
                Space
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="[&_tr:last-child]:border-t">
            <AnimatePresence initial={false}>
              {latestEvents?.map((event) => (
                <EventRow key={event._id} event={event} />
              ))}
            </AnimatePresence>
          </TableBody>
        </Table>

        {/* Narrow */}
        <Table className="md:hidden">
          <TableHeader>
            <TableRow>
              <TableHead className="sr-only">
                Dates, Retailer and Location
              </TableHead>
              <TableHead className="w-20 sr-only">Image</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="[&_tr:last-child]:border-t">
            <AnimatePresence initial={false}>
              {latestEvents?.map((event) => (
                <EventRowNarrow key={event._id} event={event} />
              ))}
            </AnimatePresence>
          </TableBody>
        </Table>

        {events.length > limit && (
          <div className="text-center mt-6">
            <button
              onClick={() => setLimit(limit + 1)}
              className="lg:text-lg underline underline-offset-2"
            >
              Show more
            </button>
          </div>
        )}
      </Container>
    </section>
  );
};

export { EventList };
