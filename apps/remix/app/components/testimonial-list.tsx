import * as React from 'react';
import { TestimonialProps } from '~/queries/testimonials';
import { Container } from './container';

interface TestimonialListProps {
  testimonials: TestimonialProps[];
}

const TestimonialList = ({ testimonials }: TestimonialListProps) => {
  return (
    <section className="bg-cararra-100 text-black py-8 lg:py-14">
      <Container>
        <div className="grid max-md:divide-y md:grid-cols-2 md:divide-x divide-black border-y border-black">
          {testimonials.map(({ _id, quote, retailer }) => (
            <div key={_id} className="flex flex-col py-10 space-y-4 md:px-8">
              <p className="font-serif flex-1 text-2xl md:text-3xl">{quote}</p>
              <p>{retailer.title}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export { TestimonialList };
