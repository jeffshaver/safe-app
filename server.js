const path = require('path')
const spawn = require('child_process').spawn
const StringDecoder = require('string_decoder').StringDecoder
const decoder = new StringDecoder(('utf8'))
const readline = require('readline')
const http = require('http')
const https = require('https')
const express = require('express')
const compression = require('compression')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const errorHandler = require('errorhandler')
const serveStatic = require('serve-static')
const config = require('./config')
const fs = require('fs')
const app = express()
const log = (msg) => (process.stdout.write(`${msg}\n`))
const createServerOptions = (config, app) => {
  const {
    protocol,
    serverKey,
    serverCertificate,
    serverCertificateAuthority
  } = config

  if (protocol === 'http') return [app]

  if (!serverKey || !serverCertificate || !serverCertificateAuthority) {
    const forgottenKeys = ['serverKey', 'serverCertificate', 'serverCertificateAuthority'].filter((key) => {
      return !config[key]
    })

    log('[WARN]: You\'re config is set to use https for the server,')
    log(`[WARN]: but you forgot to pass in ${forgottenKeys.join(', ')}`)

    return [app]
  }

  return [{
    key: fs.readFileSync(serverKey),
    cert: fs.readFileSync(serverCertificate),
    ca: fs.readFileSync(serverCertificateAuthority),
    requestCert: true,
    rejectUnauthorized: false,
    secureProtocol: 'TLSv1_2_method'
  }, app]
}
const createServer = (config, args) => {
  const {port} = config
  const protocol = args.length === 2 ? https : http

  protocol.createServer(...args).listen(port, () => {
    log(`server listning on port ${port}`)
  })
}

app.use(compression())
app.use(morgan('dev'))
app.use(errorHandler())
app.use(cookieParser())
app.use(serveStatic(path.join(__dirname, 'dist')))
app.use(serveStatic(path.join(__dirname, 'fonts')))
app.use(serveStatic(path.join(__dirname, 'node_modules')))

if (app.get('env') === 'development') {
  const webpack = require('webpack')
  const webpackDevMiddleware = require('webpack-dev-middleware')
  const webpackHotMiddleware = require('webpack-hot-middleware')
  const webpackConfig = require('./webpack.config')
  const compiler = webpack(webpackConfig)

  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  }))

  app.use(webpackHotMiddleware(compiler, {
    log: log,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000
  }))

  // Also write to disk -_-
  const runWebpack = spawn('webpack', ['--watch', '--colors', '--progress'])
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: true
  })

  runWebpack.stdout.on('data', (data) => {
    const message = decoder.write(data)

    readline.clearLine(process.stdin, 0)
    readline.cursorTo(process.stdin, 0)
    rl.write(message)
  })
  runWebpack.stderr.on('data', (error) => {
    const message = decoder.write(error)

    readline.clearLine(process.stdin, 0)
    readline.cursorTo(process.stdin, 0)
    rl.write(`${message} `)
  })
  runWebpack.on('close', (code) => {
    rl.write(`process exited with code ${code}`)
    rl.close()
  })
}

const serverOptions = createServerOptions(config, app)

createServer(config, serverOptions)

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '/src/html/index.html'))
})