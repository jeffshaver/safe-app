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
  // LIST OF VISUALIZATIONS SUPPORTED BY AN ANALYTIC
  app.get('/analytics/:analytic/visualizations', function (req, res) {
    console.log(req)
    res.send(fixtures.analyticVisualizations)
  })
  // LIST OF PARAMETERS REQUIRED FOR A SPECIFIC ANALYTIC - VISUALIZATIONS REQUIRE THEIR OWN PARAMETERS
  app.get('/analytics/:analytic/params', function (req, res) {
    console.log(req)
    res.send(fixtures.analyticParams)
  })
  // LIST OF ALL VISUALIZATIONS
  app.get('/visualizations', function (req, res) {
    console.log(req)
    res.send(fixtures.visualizations)
  })
  // INFORMATION ABOUT A SPECIFIC VISUALIZATION
  app.get('/visualizations/:visualization', function (req, res) {
    console.log(req)
    res.send(fixtures.visualizations)
  })
  // LIST OF PARAMETERS REQUIRED FOR A SPECIFIC VISUALIZATION - ANALYTICS REQUIRE THEIR OWN PARAMETERS
  app.get('/visualizations/:visualization/params', function (req, res) {
    console.log(req)
    res.send(fixtures.visualizationParams)
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