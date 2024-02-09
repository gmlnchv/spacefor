const Footer = () => {
  return (
    <footer role="contentinfo" className="py-4 bg-gray-50 text-sm">
      <div className="container">© {new Date().getFullYear()}</div>
    </footer>
  )
}

export { Footer }
