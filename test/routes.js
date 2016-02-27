var fixtures = require('./fixtures.js');

module.exports = function(app){
  // LIST OF ALL ANALYTICS
  app.get('/analytics', function (req, res) {
    console.log(req)
    res.send(fixtures.analytics)
  })
  // INFORMATION ABOUT A SPECIFIC ANALYTIC
  app.get('/analytics/:analytic', function (req, res) {
    console.log(req)
    res.send(fixtures.analytic)
  })
  // LIST OF CHARTS SUPPORTED BY AN ANALYTIC
  app.get('/analytics/:analytic/charts', function (req, res) {
    console.log(req)
    res.send(fixtures.analyticCharts)
  })
  // LIST OF PARAMETERS REQUIRED FOR A SPECIFIC ANALYTIC - CHARTS REQUIRE THEIR OWN PARAMETERS
  app.get('/analytics/:analytic/params', function (req, res) {
    console.log(req)
    res.send(fixtures.analyticParams)
  })
  // LIST OF ALL CHARTS
  app.get('/charts', function (req, res) {
    console.log(req)
    res.send(fixtures.charts)
  })
  // INFORMATION ABOUT A SPECIFIC CHART
  app.get('/charts/:chart', function (req, res) {
    console.log(req)
    res.send(fixtures.chart)
  })
  // LIST OF PARAMETERS REQUIRED FOR A SPECIFIC CHART - ANALYTICS REQUIRE THEIR OWN PARAMETERS
  app.get('/charts/:chart/params', function (req, res) {
    console.log(req)
    res.send(fixtures.chartParams)
  })
  // LIST OF DATA SOURCES
  app.get('/sources', function (req, res) {
    console.log(req)
    res.send(fixtures.sources)
  })
  // METADATA INFORMATION ABOUT A SPECIFIC DATA SOURCE
  app.get('/sources/:source', function (req, res) {
    console.log(req)
    res.send(fixtures.source)
  })
  // LIST OF ANALYTICS ENABLED FOR A SPECIFIC DATA SOURCE
  app.get('/sources/:source/analytics', function (req, res) {
    console.log(req)
    res.send(fixtures.sourceAnalytics)
  })
  // LIST OF FIELDS IN A SPECIFIC DATA SOURCE
  app.get('/sources/:source/fields', function (req, res) {
    console.log(req)
    res.send(fixtures.sourceFields)
  })

  // TO DO *****************************
  // LIST OF FILTERS ENABLED FOR A SPECIFIC DATA SOURCE
  // app.get('/sources/:source/filters', function (req, res) {
  //   console.log(req)
  //   res.send(fixtures.sourceFilters)
  // })
  // Upload a data source in .csv format?
  // app.post('/sources', function (req, res) {
  //   console.log(req)
  //   res.send(fixtures.sources)
  // })
  // Search data sources
  // app.post('/search', function (req, res) {
  //   console.log(req)
  //   res.send(fixtures.search)
  // })
}