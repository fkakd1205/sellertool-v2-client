module.exports = {
  reactStrictMode: true,
  trailingSlash: true,
  env: {
    development: {
      apiAddress: 'http://localhost:8081',
      scpApiAddress: 'http://localhost:7081',
      authApiAddress: 'http://localhost:9081',
      socketAddress: 'http://localhost:8081/wsc'
    },
    production: {
      apiAddress: 'https://api.sellertl.com',
      scpApiAddress: 'https://scp.sellertl.com',
      authApiAddress: 'https://auth.sellertl.com',
      socketAddress: 'http://api.sellertl.com/wsc'
    }
  },
  images: {
    loader: "imgix",
    path: "http://localhost:3000",
  },
}
