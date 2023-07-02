/** @type {import('next').NextConfig} */

module.exports = {
  output: 'standalone',
  rewrites: () => {
    return [
      {
        source: '/api/:path*',
        destination: `https://api.msborkson.com/api/:path*`,
      },
      {
        source: '/static/:path*',
        destination: `https://api.msborkson.com/static/:path*`,
      }
    ]
  }
}
