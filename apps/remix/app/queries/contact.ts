import { runQuery } from '~/lib/sanity.ts';
import { q } from 'groqd';
import { meta } from '~/queries/meta.ts';
import { seo } from '~/queries/seo.ts';
import { accordionItemSelection } from './accordion-item';

const query = q('*')
  .filterByType('contactPage')
  .grab$({
    ...meta,
    ...seo,
    body: q.array(q.contentBlock()),
    accordionList: q('accordionList')
      .grab$({
        title: q.string(),
        items: q.array(q.object(accordionItemSelection)),
      })
      .nullable(),
  })
  .slice(0);

export async function getContactPage() {
  return runQuery(query);
}
