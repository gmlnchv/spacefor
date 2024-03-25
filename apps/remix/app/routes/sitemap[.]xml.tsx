import { LoaderFunction } from '@remix-run/node';
import { getSlugs } from '~/queries/slugs';

export const loader: LoaderFunction = async () => {
  const slugs = await getSlugs();
  console.log(slugs);
  return new Response(renderXML(slugs), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'x-content-type-options': 'nosniff',
      'Cache-Control': `public, max-age=${60 * 10}, s-maxage=${60 * 60 * 24}`,
    },
  });
};

const renderXML = (slugs: { slug?: string }[]) => {
  const url = 'https://spacefor.nz';

  return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${slugs.filter(Boolean).map(
      (item) => `<url>
      <loc>${url}${item.slug}</loc>
    </url>`
    )}
  </urlset>`;
};
