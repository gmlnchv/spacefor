import { useOutletContext } from '@remix-run/react';
import { Container } from '~/components/container.tsx';
import { SiteLogo } from './site-logo';

const Footer = () => {
  const { globalData } = useOutletContext();

  return (
    <footer role="contentinfo" className="py-20 pb-10 bg-black text-white">
      <Container>
        <div className="grid grid-cols-[1fr_100px] lg:grid-cols-[1fr_400px] grid-flow-row auto-rows-max">
          {/* Text */}
          <div className="max-lg:col-span-2 min-h-36">
            <div className="bg-white text-black p-4 lg:p-8 h-full">
              <p className="font-serif text-2xl max-w-xl lg:text-5xl">
                {globalData.footer.footerText}
              </p>
            </div>
          </div>

          {/* Logo */}
          <SiteLogo
            colorScheme="light"
            className="max-lg:col-start-2 size-[100px] lg:size-[400px] border-2 border-white row-span-2"
          />

          {/* Social */}
          <div className="flex items-center lg:px-2.5 max-lg:row-start-2 max-lg:row-span-2">
            {globalData.settings.instagram && (
              <a
                href={globalData.settings.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="size-6 lg:size-4"
              >
                <span className="sr-only">Instagram</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="lg:size-5"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <g clipPath="url(#a)">
                    <path
                      fill="#fff"
                      d="M10 1.802c2.67 0 2.986.01 4.04.058.976.045 1.505.207 1.858.344.466.182.8.399 1.15.748.35.35.566.684.748 1.15.137.353.3.882.344 1.857.048 1.055.058 1.37.058 4.041 0 2.67-.01 2.986-.058 4.04-.045.976-.207 1.505-.345 1.858-.18.466-.398.8-.748 1.15-.35.35-.683.566-1.15.748-.352.137-.881.3-1.856.344-1.055.048-1.37.058-4.041.058-2.67 0-2.987-.01-4.04-.058-.976-.045-1.505-.207-1.858-.345a3.098 3.098 0 0 1-1.15-.747 3.098 3.098 0 0 1-.748-1.15c-.137-.353-.3-.882-.344-1.857-.048-1.055-.058-1.37-.058-4.041 0-2.67.01-2.986.058-4.04.045-.976.207-1.505.344-1.858.182-.466.398-.8.748-1.15.35-.35.684-.566 1.15-.748.353-.137.882-.3 1.857-.344 1.055-.048 1.37-.058 4.041-.058ZM10 0C7.284 0 6.944.011 5.877.06 4.813.11 4.086.278 3.45.525a4.901 4.901 0 0 0-1.772 1.153A4.901 4.901 0 0 0 .525 3.45C.278 4.086.109 4.813.06 5.877.011 6.944 0 7.284 0 10s.011 3.056.06 4.123c.049 1.064.218 1.791.465 2.427a4.9 4.9 0 0 0 1.153 1.772 4.9 4.9 0 0 0 1.772 1.153c.636.247 1.363.416 2.427.465 1.067.048 1.407.06 4.123.06s3.056-.012 4.123-.06c1.064-.049 1.791-.218 2.427-.465a4.9 4.9 0 0 0 1.772-1.153 4.901 4.901 0 0 0 1.153-1.772c.247-.636.416-1.363.465-2.427.048-1.067.06-1.407.06-4.123s-.012-3.056-.06-4.123c-.049-1.064-.218-1.791-.465-2.427a4.9 4.9 0 0 0-1.153-1.772A4.901 4.901 0 0 0 16.55.525C15.914.278 15.187.109 14.123.06 13.056.011 12.716 0 10 0Zm0 4.865a5.135 5.135 0 1 0 0 10.27 5.135 5.135 0 0 0 0-10.27Zm0 8.468a3.333 3.333 0 1 1 0-6.667 3.333 3.333 0 0 1 0 6.667Zm6.538-8.671a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0Z"
                    />
                  </g>
                  <defs>
                    <clipPath id="a">
                      <path fill="#fff" d="M0 0h20v20H0z" />
                    </clipPath>
                  </defs>
                </svg>
              </a>
            )}
          </div>

          {/* Copyright */}
          <p className="text-sm col-span-2 lg:pt-28">
            {globalData.settings.siteTitle ?? null}{' '}
            <span className="opacity-50">©</span> {new Date().getFullYear()}
          </p>
        </div>
      </Container>
    </footer>
  );
};

export { Footer };
