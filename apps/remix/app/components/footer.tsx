import { useOutletContext } from '@remix-run/react'

const Footer = () => {
  const context = useOutletContext()
  return (
    <footer role="contentinfo" className="py-4">
      <div className="container">
        <p className="text-sm">
          {context.settings?.siteTitle} <span className="opacity-50">©</span>{' '}
          {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  )
}

export { Footer }
