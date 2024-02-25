import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react';
import type { LinksFunction } from '@vercel/remix';
import { json } from '@remix-run/node';
import { getGlobalData } from '~/queries/settings.ts';

import styles from './styles.css';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: styles },
  {
    rel: 'icon',
    sizes: '32x32',
    href: '/favicons/favicon.ico',
  },
  {
    rel: 'icon',
    type: 'image/svg+xml',
    href: '/favicons/favicon.svg',
  },
  {
    rel: 'apple-touch-icon',
    href: '/favicons/apple-touch-icon.png',
  },
  {
    rel: 'manifest',
    href: '/manifest.webmanifest',
  },
];

export const loader = async () => {
  const globalData = await getGlobalData();

  return json({ globalData });
};

export default function App() {
  const { globalData } = useLoaderData<typeof loader>();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="antialiased">
        <Outlet
          context={{
            globalData,
          }}
        />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
