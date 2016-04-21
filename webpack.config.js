const path = require('path')
const webpack = require('webpack')
const config = require('./config')

module.exports = {
  context: __dirname,
  entry: [
    './src/js/index.jsx',
    'webpack-hot-middleware/client'
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: config.protocol + '://' + config.domain + ':' + config.port + '/dist/',
    filename: 'bundle.js'
  },
  plugins: [
    // Webpack 1.0
    new webpack.optimize.OccurenceOrderPlugin(),
    // Webpack 2.0 fixed this mispelling
    // new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [{
      test: /\.js|\.jsx/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015', 'stage-0'],
        plugins: ['transform-decorators-legacy']
      }
    }]
  }
}