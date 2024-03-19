import {
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'ui';
import { Button, Textarea } from 'ui';
import { useFetcher } from '@remix-run/react';

const ContactForm = () => {
  const form = useFetcher();
  console.log(form);
  return (
    <>
      {!form.data && (
        <form.Form
          method="post"
          action="/contact"
          className="grid gap-5 grid-cols-2"
        >
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

          <div className="col-span-2">
            <Select name="reason" required>
              <SelectTrigger>
                <SelectValue placeholder="Reason for contact" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Showroom enquiry">
                  Showroom enquiry
                </SelectItem>
                <SelectItem value="Partnership enquiry">
                  Partnership enquiry
                </SelectItem>
                <SelectItem value="Press enquiry">Press enquiry</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

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

          <div className="col-span-2 justify-self-end">
            <Button type="submit">Submit</Button>
          </div>
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
    </>
  );
};

export { ContactForm };
