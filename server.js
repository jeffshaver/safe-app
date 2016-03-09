var path = require('path')
var exec = require('child_process').exec
var express = require('express')
var app = express()
var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var config = require('./config')
var webpackConfig = require('./webpack.config')
var compiler = webpack(webpackConfig)

app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath
}))

app.use(webpackHotMiddleware(compiler, {
  log: console.log,
  path: '/__webpack_hmr',
  heartbeat: 10 * 1000
}))

app.use(express.static('dist'))
app.use(express.static('fonts'))
app.use(express.static('node_modules'))
app.use('config.js', express.static('config.js'))

// FIXTURE ROUTES FOR TESTING
require('./test/routes')(app)

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '/src/html/index.html'))
})

app.listen(config.port, function () {
  console.log('Listening on port ' + config.port)
})

exec('webpack --watch')