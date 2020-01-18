const withCSS = require('@zeit/next-css')
const withLess = require('@zeit/next-less')
const path = require('path')

module.exports = withCSS(withLess({
  lessLoaderOptions: {
    javascriptEnabled: true
  },
  compress: false,
  webpack(config, options) {
    config.resolve.alias['@assets'] = path.join(__dirname, 'assets')
    config.resolve.alias['@components'] = path.join(__dirname, 'components')
    config.resolve.alias['@pages'] = path.join(__dirname, 'pages')
    config.resolve.alias['@models'] = path.join(__dirname, 'models')
    config.resolve.alias['@reducers'] = path.join(__dirname, 'reducers')
    config.resolve.alias['@hooks'] = path.join(__dirname, 'hooks')

    return config
  },
}));