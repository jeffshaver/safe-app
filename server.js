const path = require('path')
const exec = require('child_process').exec
const fs = require('fs')
const https = require('https')
const express = require('express')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const errorHandler = require('errorhandler')
const serveStatic = require('serve-static')
const config = require('./config')

var app = express()

app.use(morgan('dev'))
app.use(errorHandler())
app.use(cookieParser())
app.use(serveStatic(path.join(__dirname, 'dist')))
app.use(serveStatic(path.join(__dirname, 'fonts')))
app.use(serveStatic(path.join(__dirname, 'node_modules')))

if (app.get('env') === 'development') {
  var webpack = require('webpack')
  var webpackDevMiddleware = require('webpack-dev-middleware')
  var webpackHotMiddleware = require('webpack-hot-middleware')
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

  // Also write to disk -_-
  exec('webpack --watch')
}

// FIXTURE ROUTES FOR TESTING
require('./test/routes')(app)

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '/src/html/index.html'))
})

if (config.mongoUri) {
  const session = require('express-session')
  const connectMongo = require('connect-mongo')
  const MongoStore = connectMongo(session)
  const mongoOptions = {
    url: config.mongoUri,
    pool: true
  }

  app.use(session({
    cookie: {
      maxAge: 60 * 60 * 12 * 1000
    },
    resave: false,
    saveUninitialized: true,
    secret: config.sessionSecret,
    store: new MongoStore(mongoOptions)
  }))

  const mongoClient = require('mongodb').MongoClient

  mongoClient.connect(config.mongoUri, (error, database) => {
    if (error) {
      throw new Error(error)
    }

    console.log('Connected to Mongo')

    app.set('db', database)

    const serverOptions = {
      key: fs.readFileSync(config.serverKey),
      cert: fs.readFileSync(config.serverCertificate),
      ca: fs.readFileSync(config.serverCertificateAuthority),
      requestCert: true,
      rejectUnauthorized: true
    }

    https.createServer(serverOptions, app).listen(config.port, () => {
      console.log(`server listning on port ${config.port}`)
    })
  })
} else {
  app.listen(config.port, process.env.IP, () => {
    console.log(`server listning on port ${config.port}`)
  })
}