export function getMetaTags({
  title = 'Spacefor | Showroom On Demand | Premium Pop Up Space',
  description = 'Bring your brand to life. Adaptable showroom for pop-up activations for as little as one week.',
  image = 'https://spacefor-remix.vercel.app/images/default-og-image.jpg',
  slug,
}: {
  title?: string;
  description?: string;
  image?: string;
  slug: string;
}) {
  const url = `https://spacefor.nz${slug}`;
  return [
    { title },
    { name: 'description', content: description },
    // Open Graph / Facebook
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:url', content: url },
    { property: 'og:image', content: image },
    // Twitter
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: image },
    { name: 'twitter:url', content: url },
    {
      name: 'twitter:card',
      content: image ? 'summary_large_image' : 'summary',
    },
  ];
}
