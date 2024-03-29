const path = require('node:path')

const glob = require('glob')

const packages = glob
  .sync('packages/**/package.json', {
    cwd: path.join(__dirname, '..', '..'),
    ignore: ['**/node_modules/**'],
    absolute: true,
  })
  .map((pkg) => path.dirname(pkg))

/**
 * @type {import('@remix-run/dev').AppConfig}
 */
module.exports = {
  future: {},
  ignoredRouteFiles: ['**/.*'],
  // When running locally in development mode, we use the built-in remix
  // server. This does not understand the vercel lambda module format,
  // so we default back to the standard build output.
  serverDependenciesToBundle: 'all',
  serverBuildPath: 'build/index.cjs',
  serverModuleFormat: 'cjs',
  watchPaths: packages,
}
