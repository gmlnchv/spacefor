import { useOutletContext } from '@remix-run/react';
import { Container } from '~/components/container.tsx';

const Footer = () => {
  const context = useOutletContext();
  return (
    <footer role="contentinfo" className="py-4 bg-black text-white">
      <Container>
        <p className="text-sm">
          {context.globalData.settings.siteTitle ?? ''}{' '}
          <span className="opacity-50">©</span> {new Date().getFullYear()}
        </p>
      </Container>
    </footer>
  );
};

export { Footer };
