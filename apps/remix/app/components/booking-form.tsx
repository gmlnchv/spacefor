import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from 'ui';
import { useFetcher, useOutletContext } from '@remix-run/react';
import { Context } from '~/types';

export const BookingForm = () => {
  const form = useFetcher();
  const { globalData }: Context = useOutletContext();
  const { spaces } = globalData;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="inverse">Enquire</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Book a showroom</DialogTitle>
          <DialogDescription>
            <p>Interested in Spacefor?</p>
            <p>Get in touch by filling out the form.</p>
          </DialogDescription>
        </DialogHeader>

        {!form.data && (
          <form.Form
            id="bookingForm"
            method="post"
            action="/book"
            className="space-y-9"
          >
            <fieldset className="grid gap-5 grid-cols-2">
              <legend className="col-span-2 text-xl	font-serif mb-2 block">
                Your details
              </legend>

              <div className="max-sm:col-span-2">
                <label htmlFor="firstName" className="sr-only">
                  First Name
                </label>

                <Input
                  name="firstName"
                  id="firstName"
                  placeholder="First Name"
                  required
                />
              </div>

              <div className="max-sm:col-span-2">
                <label htmlFor="lastName" className="sr-only">
                  Last Name
                </label>

                <Input
                  name="lastName"
                  id="lastName"
                  placeholder="Last Name"
                  required
                />
              </div>

              <div className="col-span-2">
                <label htmlFor="email" className="sr-only">
                  Email
                </label>

                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  required
                />
              </div>

              <div className="col-span-2">
                <label htmlFor="companyName" className="sr-only">
                  Company Name
                </label>

                <Input
                  name="companyName"
                  id="companyName"
                  placeholder="Company Name"
                  required
                />
              </div>
            </fieldset>

            <fieldset className="grid gap-5 grid-cols-2">
              <legend className="col-span-2 text-xl	font-serif mb-2 block">
                Which space are you interested in?
              </legend>

              <Select name="space" required>
                <SelectTrigger className="col-span-2">
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Any">Any</SelectItem>
                  {spaces.map((space) => (
                    <SelectItem key={space} value={space}>
                      {space}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </fieldset>

            <fieldset className="grid gap-5 grid-cols-2">
              <legend className="col-span-2 text-xl	mb-2 font-serif block">
                When would you like it?
              </legend>

              <div className="col-span-2">
                <label htmlFor="companyName" className="sr-only">
                  Date
                </label>

                <Input
                  name="date"
                  type="date"
                  placeholder="DD/MM/YYYY"
                  className="inline-block"
                  required
                />
              </div>
            </fieldset>

            <fieldset className="grid gap-5 grid-cols-2">
              <legend className="col-span-2 text-xl	font-serif mb-2 block">
                How long would you like the booking for?
              </legend>

              <Select name="duration" required>
                <SelectTrigger className="col-span-2">
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Up to 1 week">Up to 1 week</SelectItem>
                  <SelectItem value="2 weeks">2 weeks</SelectItem>
                  <SelectItem value="3-4 weeks">3-4 weeks</SelectItem>
                </SelectContent>
              </Select>
            </fieldset>

            <fieldset className="grid gap-5 grid-cols-2">
              <legend className="col-span-2 text-xl	font-serif mb-2 block">
                Tell us about your brand and pop-up ideas.
              </legend>

              <div className="col-span-2">
                <label htmlFor="message" className="sr-only">
                  Message
                </label>

                <Textarea
                  name="message"
                  id="message"
                  placeholder="Message"
                  rows={4}
                  required
                />
              </div>
            </fieldset>
          </form.Form>
        )}

        {/* success */}
        {form.data?.status === 200 && (
          <div className="border border-black p-6 text-sm">
            {form.data.message}
          </div>
        )}

        {/* error */}
        {form.data?.status === 400 && (
          <div className="border border-red-600 text-red-600 p-6 text-sm">
            {form.data.message}
          </div>
        )}

        <DialogFooter>
          <div className="col-span-2 justify-self-end">
            <Button type="submit" form="bookingForm">
              Submit
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
