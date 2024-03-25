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
import { getGlobalData } from '~/queries/global';

import styles from './styles.css';
import { Suspense } from 'react';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: styles },
  {
    rel: 'icon',
    sizes: '32x32',
    href: '/favicons/favicon.ico',
  },
];

export const loader = async () => {
  const globalData = await getGlobalData();

  return json({
    globalData,
  });
};

export default function App() {
  const { globalData } = useLoaderData<typeof loader>();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:type" content="website" />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-XN5BQ93KM3"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XN5BQ93KM3');
            `,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '973849090392242');
              fbq('track', 'PageView');
            `,
          }}
        />
        <Meta />
        <Links />
      </head>
      <body className="antialiased">
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=973849090392242&ev=PageView&noscript=1"
          />
        </noscript>
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
