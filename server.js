var express = require('express')
var config = require('./config.js')
var app = express()

app.use(express.static('dist'))
app.use(express.static('node_modules'))
app.use('config.js', express.static('config.js'))

app.get('/*', function (req, res) {
  res.sendFile(__dirname + '/src/html/index.html')
})

app.listen(config.port, function () {
  console.log('Listening on port ' + config.port)
})