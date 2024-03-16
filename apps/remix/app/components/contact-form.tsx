import * as React from 'react';
import {
  Input,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from 'ui/src';
import { Button, Textarea } from 'ui';

const ContactForm = () => {
  return (
    <form className="grid gap-5 grid-cols-2">
      <div className="max-sm:col-span-2">
        <label htmlFor="firstName" className="sr-only">
          First Name
        </label>

        <Input name="firstName" id="firstName" placeholder="First Name" />
      </div>

      <div className="max-sm:col-span-2">
        <label htmlFor="lastName" className="sr-only">
          Last Name
        </label>

        <Input name="lastName" id="lastName" placeholder="Last Name" />
      </div>

      <div className="col-span-2">
        <label htmlFor="email" className="sr-only">
          Email
        </label>

        <Input type="email" name="email" id="email" placeholder="Email" />
      </div>

      <div className="col-span-2">
        <label htmlFor="companyName" className="sr-only">
          Company Name
        </label>

        <Input name="companyName" id="companyName" placeholder="Company Name" />
      </div>

      <div className="col-span-2">
        <label htmlFor="message" className="sr-only">
          Message
        </label>

        <Textarea name="message" id="message" placeholder="Message" rows={4} />
      </div>

      <div className="col-span-2">
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Reason for contact" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Showroom enquiry">Showroom enquiry</SelectItem>
            <SelectItem value="Partnership enquiry">
              Partnership enquiry
            </SelectItem>
            <SelectItem value="Press enquiry">Press enquiry</SelectItem>
            <SelectItem value="Other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="col-span-2 justify-self-end">
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
};

export { ContactForm };
