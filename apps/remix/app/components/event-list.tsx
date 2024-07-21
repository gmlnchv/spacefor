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
import { ArrowUpRight } from '@phosphor-icons/react';

interface EventListProps {
  events: EventProps[];
}

const AnimatedTableRow = motion(TableRow);

const useEventDates = ({
  start_date,
  end_date,
  is_coming_soon,
}: EventProps) => {
  const parsedStartDate = start_date
    ? parseISO(start_date.toString())
    : new Date();
  const parsedEndDate = end_date ? parseISO(end_date.toString()) : new Date();

  const eventIsSameMonth = is_coming_soon
    ? false
    : isSameMonth(parsedStartDate, parsedEndDate);
  const eventIsPast = is_coming_soon ? false : isPast(parsedEndDate);

  const formattedDate = eventIsSameMonth
    ? `${format(parsedStartDate, 'd')}\u2013${format(
        parsedEndDate,
        'd MMM yyyy'
      )}`
    : `${format(parsedStartDate, 'd MMM yyyy')}\u2013${format(
        parsedEndDate,
        'd MMM yyyy'
      )}`;

  const label = is_coming_soon
    ? 'Coming Soon'
    : eventIsPast
    ? 'Finished'
    : formattedDate;

  return { formattedDate, eventIsSameMonth, eventIsPast, label };
};

const EventRow = React.forwardRef<HTMLTableRowElement, { event: EventProps }>(
  ({ event }, ref) => {
    const { retailer, space } = event;
    const { eventIsPast, label } = useEventDates(event);

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
        <TableCell className="px-0 h-24 w-1/4">{label}</TableCell>
        <TableCell className="font-serif h-24 text-xl px-2">
          <div className="flex items-center gap-x-5">
            <Image
              src={retailer.image.asset.url}
              layout="fixed"
              height={60}
              width={80}
              alt={retailer.title}
            />
            {retailer.url ? (
              <a
                href={retailer.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 decoration-1 decoration-transparent hover:decoration-current hover:underline underline-offset-4 transition-all"
              >
                {retailer.title}
                <ArrowUpRight className="size-4 mt-0.5" />
              </a>
            ) : (
              retailer.title
            )}
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
  const { retailer, space } = event;
  const { eventIsPast, label } = useEventDates(event);

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
        {label}
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
    <Container>
      {/* Wide */}
      <Table className="max-md:hidden">
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
  );
};

export { EventList };
