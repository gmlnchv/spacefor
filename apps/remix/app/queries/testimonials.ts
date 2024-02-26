import { q, type Selection, type TypeFromSelection } from 'groqd';
import { retailerSelection } from './retailer';

export const testimonialSelection: Selection = {
  _id: q.string(),
  retailer: q('retailer').deref().grab$(retailerSelection),
  quote: q.string(),
};

export const testimonials: Selection = {
  testimonials: q('*')
    .filterByType('testimonial')
    .filter('show == true')
    .order('_createdAt desc')
    .slice(0, 1)
    .grab$(testimonialSelection),
};

export type TestimonialProps = TypeFromSelection<typeof testimonialSelection>;
