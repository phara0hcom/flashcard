const webpackDev = require('./webpack.dev.config.js'); // Dev
const webpackPro = require('./webpack.production.config.js'); // production

if (process.env.NODE_ENV === 'production') {
  console.log(' -=== production ===-')
  module.exports = webpackPro
}else {
  module.exports = webpackDev
}