const fixtures = require('./fixtures.js')

module.exports = function (app) {
  // authentication
  app.get('/api/authenticate', function (req, res) {
    // Simulate some lag
    setTimeout(() => {
      res.status(200).json({
        authenticated: true,
        username: 'unknown'
      })
    }, 1000)
  })

  // LIST OF ALL ANALYTICS
  app.get('/api/analytics', function (req, res) {
    res.send(fixtures.analytics)
  })
  // INFORMATION ABOUT A SPECIFIC ANALYTIC
  app.get('/api/analytics/:analytic', function (req, res) {
    res.send(fixtures.analytic)
  })
  // LIST OF VISUALIZATIONS SUPPORTED BY AN ANALYTIC
  app.get('/api/analytics/:analytic/visualizations', function (req, res) {
    res.send(fixtures.analyticVisualizations)
  })
  // LIST OF PARAMETERS REQUIRED FOR A SPECIFIC ANALYTIC - VISUALIZATIONS REQUIRE THEIR OWN PARAMETERS
  app.get('/api/analytics/:analytic/params', function (req, res) {
    res.send(fixtures.analyticParams)
  })
  // LIST OF ALL VISUALIZATIONS
  app.get('/api/visualizations', function (req, res) {
    res.send(fixtures.visualizations)
  })
  // INFORMATION ABOUT A SPECIFIC VISUALIZATION
  app.get('/api/visualizations/:visualization', function (req, res) {
    res.send(fixtures.visualizations)
  })
  // LIST OF PARAMETERS REQUIRED FOR A SPECIFIC VISUALIZATION - ANALYTICS REQUIRE THEIR OWN PARAMETERS
  app.get('/api/visualizations/:visualization/params', function (req, res) {
    res.send(fixtures.visualizationParams)
  })
  // LIST OF DATA SOURCES
  app.get('/api/sources', function (req, res) {
    res.send(fixtures.sources)
  })
  // METADATA INFORMATION ABOUT A SPECIFIC DATA SOURCE
  app.get('/api/sources/:source', function (req, res) {
    res.send(fixtures.source)
  })
  // LIST OF ANALYTICS ENABLED FOR A SPECIFIC DATA SOURCE
  app.get('/api/sources/:source/analytics', function (req, res) {
    res.send(fixtures.sourceAnalytics)
  })
  // LIST OF FIELDS IN A SPECIFIC DATA SOURCE
  app.get('/api/sources/:source/fields', function (req, res) {
    res.send(fixtures.sourceFields)
  })
  // SEARCH A SPECIFIC DATA SOURCE
  app.post('/api/sources/:source/query', function (req, res) {
    res.send(fixtures.searchResults)
  })
  app.post('/api/metrics', function (req, res) {
    res.status(200).json(req.body.events)
  })
  // TO DO *****************************
  // LIST OF FILTERS ENABLED FOR A SPECIFIC DATA SOURCE
  // app.get('/api/sources/:source/filters', function (req, res) {
  //   console.log(req)
  //   res.send(fixtures.sourceFilters)
  // })
  // Upload a data source in .csv format?
  // app.post('/sources', function (req, res) {
  //   console.log(req)
  //   res.send(fixtures.sources)
  // })
  // app.post('/search', function (req, res) {
  //   console.log(req)
  //   res.send(fixtures.search)
  // })
}