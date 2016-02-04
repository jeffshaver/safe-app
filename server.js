var express = require('express')
var app = express()

app.use(express.static('dist'))
app.use(express.static('node_modules'))

app.get('/*', function (req, res) {
  res.sendFile(__dirname + '/src/html/index.html')
})

app.listen(process.env.PORT, function () {
  console.log('Listening on port '+process.env.PORT)
})