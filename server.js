var express = require('express')
var app = express()
var config = require('./config.js')

app.use(express.static('dist'))
app.use(express.static('node_modules'))
app.use('config.js', express.static('config.js'))

// FIXTURE ROUTES FOR TESTING
require('./test/routes')(app)

app.get('/*', function (req, res) {
  res.sendFile(__dirname + '/src/html/index.html')
})

app.listen(config.port, function () {
  console.log('Listening on port ' + config.port)
})