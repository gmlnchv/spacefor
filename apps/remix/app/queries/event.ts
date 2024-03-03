import { q, Selection, type TypeFromSelection } from 'groqd'
import { retailerSelection } from '~/queries/retailer.ts'

export const eventSelection: Selection = {
  _id: q.string(),
  start_date: q.date(),
  end_date: q.date(),
  retailer: q('retailer').deref().grab$(retailerSelection),
  space: q('space')
    .deref()
    .grab$({
      title: q.string(),
      slug: q.slug('slug'),
    }),
}

export type EventProps = TypeFromSelection<typeof eventSelection>
