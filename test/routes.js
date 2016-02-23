var fixtures = require('./fixtures.js');

module.exports = function(app){
  // LIST OF ALL ANALYTICS
  app.get('/routes/analytics', function (req, res) {
    console.log(req)
    res.send(fixtures.analytics)
  })
  // INFORMATION ABOUT A SPECIFIC ANALYTIC
  app.get('/routes/analytics/:analytic', function (req, res) {
    console.log(req)
    res.send(fixtures.analytic)
  })
  // LIST OF CHARTS SUPPORTED BY AN ANALYTIC
  app.get('/routes/analytics/:analytic/charts', function (req, res) {
    console.log(req)
    res.send(fixtures.analyticCharts)
  })
  // LIST OF PARAMETERS REQUIRED FOR A SPECIFIC ANALYTIC - CHARTS REQUIRE THEIR OWN PARAMETERS
  app.get('/routes/analytics/:analytic/params', function (req, res) {
    console.log(req)
    res.send(fixtures.analyticParams)
  })
  // LIST OF ALL CHARTS
  app.get('/routes/charts', function (req, res) {
    console.log(req)
    res.send(fixtures.charts)
  })
  // INFORMATION ABOUT A SPECIFIC CHART
  app.get('/routes/charts/:chart', function (req, res) {
    console.log(req)
    res.send(fixtures.chart)
  })
  // LIST OF PARAMETERS REQUIRED FOR A SPECIFIC CHART - ANALYTICS REQUIRE THEIR OWN PARAMETERS
  app.get('/routes/charts/:chart/params', function (req, res) {
    console.log(req)
    res.send(fixtures.chartParams)
  })
  // LIST OF DATA SOURCES
  app.get('/routes/sources', function (req, res) {
    console.log(req)
    res.send(fixtures.sources)
  })
  // METADATA INFORMATION ABOUT A SPECIFIC DATA SOURCE
  app.get('/routes/sources/:source', function (req, res) {
    console.log(req)
    res.send(fixtures.source)
  })
  // LIST OF ANALYTICS ENABLED FOR A SPECIFIC DATA SOURCE
  app.get('/routes/sources/:source/analytics', function (req, res) {
    console.log(req)
    res.send(fixtures.sourceAnalytics)
  })
  // LIST OF FIELDS IN A SPECIFIC DATA SOURCE
  app.get('/routes/sources/:source/fields', function (req, res) {
    console.log(req)
    res.send(fixtures.sourceFields)
  })

  // TO DO *****************************
  // LIST OF FILTERS ENABLED FOR A SPECIFIC DATA SOURCE
  // app.get('/routes/sources/:source/filters', function (req, res) {
  //   console.log(req)
  //   res.send(fixtures.sourceFilters)
  // })
  // Upload a data source in .csv format?
  // app.post('/routes/sources', function (req, res) {
  //   console.log(req)
  //   res.send(fixtures.sources)
  // })
  // Search data sources
  // app.post('/routes/search', function (req, res) {
  //   console.log(req)
  //   res.send(fixtures.search)
  // })
}