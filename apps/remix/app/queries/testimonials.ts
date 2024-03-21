import { q, type Selection, type TypeFromSelection } from 'groqd';
import { retailerSelection } from './retailer';

export const testimonialSelection = {
  _id: q.string(),
  retailer: q('retailer').deref().grab$(retailerSelection),
  quote: q.string(),
} satisfies Selection;

export type TestimonialProps = TypeFromSelection<typeof testimonialSelection>;
