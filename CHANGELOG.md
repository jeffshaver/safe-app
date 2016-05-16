# safe-app ChangeLog

## 0.0.8 (May 16, 2016)

### Changes

* [[2a9becb](https://github.com/jeffshaver/safe-app/commit/2a9becb)] - force fetch to pass credentials ([jeffshaver](https://github.com/jeffshaver))
* [[21c99d7](https://github.com/jeffshaver/safe-app/commit/21c99d7)] - initial safe-rest integration of dashboards ([pml984](https://github.com/pml984))
* [[c0e961d](https://github.com/jeffshaver/safe-app/commit/c0e961d)] - config option to add top/bottom banners ([jeffshaver](https://github.com/jeffshaver))
* [[640de70](https://github.com/jeffshaver/safe-app/commit/640de70)] - force tls 1.2 ([knorris](https://github.com/knorris))
* [[08dbf9d](https://github.com/jeffshaver/safe-app/commit/08dbf9d)] - enable asset compression ([jeffshaver](https://github.com/jeffshaver))
* [[1cde6bf](https://github.com/jeffshaver/safe-app/commit/1cde6bf)] - add config to disable routes by name ([jeffshaver](https://github.com/jeffshaver))
* [[0018fbc](https://github.com/jeffshaver/safe-app/commit/0018fbc)] - import directly from material-ui instead of lib path ([jeffshaver](https://github.com/jeffshaver))
* [[35974e1](https://github.com/jeffshaver/safe-app/commit/35974e1)] - fixes receievedAt misspellings ([jeffshaver](https://github.com/jeffshaver))
* [[64fc690](https://github.com/jeffshaver/safe-app/commit/64fc690)] - adds missing reducers into root reducer ([jeffshaver](https://github.com/jeffshaver))
* [[06cf2a1](https://github.com/jeffshaver/safe-app/commit/06cf2a1)] - make this changelog ([jeffshaver](https://github.com/jeffshaver))

### Dependency updates

* update `babel-plugin-add-module-exports` to `0.2.0`
* update `expect` to `1.20.1`
* update `material-ui` to `0.15.0`
* update `safe-framework` to `0.0.18`

## 0.0.7 (May 5, 2016)

### Changes

* Fix Search by updating react-leaflet and removing the map and bar chart

## 0.0.6 (May 5, 2016)

### Changes

* [[d313638](https://github.com/jeffshaver/safe-app/commit/d313638)] - use SelectField component. add loading states to SelectField.jsx ([jeffshaver](https://github.com/jeffshaver))
* [[21245e3](https://github.com/jeffshaver/safe-app/commit/21245e3)] - simplify some code. update travis.yml to node 6 ([jeffshaver](https://github.com/jeffshaver))
* [[a3ad08e](https://github.com/jeffshaver/safe-app/commit/a3ad08e)] - add failure state to dashboard ajax requests. split up dashboard actions ([jeffshaver](https://github.com/jeffshaver))
* [[7e07dc0](https://github.com/jeffshaver/safe-app/commit/7e07dc0)] - add failure states for ajax requests ([jeffshaver](https://github.com/jeffshaver))
* [[a47d7e8](https://github.com/jeffshaver/safe-app/commit/a47d7e8)] - consolidate the FilterCriteria components events ([jeffshaver](https://github.com/jeffshaver))
* [[af5467b](https://github.com/jeffshaver/safe-app/commit/af5467b)] - change visualizations to visualization-types ([jeffshaver](https://github.com/jeffshaver))
* [[57e5c10](https://github.com/jeffshaver/safe-app/commit/57e5c10)] - convert filters to number/boolean if needed ([knorris](https://github.com/knorris)) [#82](https://github.com/jeffshaver/safe-app/pull/82)
* [[3d500d1](https://github.com/jeffshaver/safe-app/commit/3d500d1)] - add tests for map ([knorris](https://github.com/knorris)) [#78](https://github.com/jeffshaver/safe-app/pull/78)
* [[16bba33](https://github.com/jeffshaver/safe-app/commit/16bba33)] - add script to clean up dist dir ([jeffshaver](https://github.com/jeffshaver))
* [[80af36f](https://github.com/jeffshaver/safe-app/commit/80af36f)] - force webpack to output to stdout ([jeffshaver](https://github.com/jeffshaver))
* [[88cea5c](https://github.com/jeffshaver/safe-app/commit/88cea5c)] - destructure action in reducers ([jeffshaver](https://github.com/jeffshaver))
* [[68d2709](https://github.com/jeffshaver/safe-app/commit/68d2709)] - update eslint rules ([jeffshaver](https://github.com/jeffshaver))
* [[bfe397f](https://github.com/jeffshaver/safe-app/commit/bfe397f)] - add map to search ([knorris](https://github.com/knorris))
* [[fe5a056](https://github.com/jeffshaver/safe-app/commit/fe5a056)] - select dashboard fix ([cafedavid](https://github.com/cafedavid)) [#77](https://github.com/jeffshaver/safe-app/pull/77)
* [[0ffa957](https://github.com/jeffshaver/safe-app/commit/0ffa957)] - dashboard CRUD ([cafedavid](https://github.com/cafedavid)) [#71](https://github.com/jeffshaver/safe-app/pull/71)
* [[94161b2](https://github.com/jeffshaver/safe-app/commit/94161b2)] - change redux file and naming conventions ([jeffshaver](https://github.com/jeffshaver)) [#73](https://github.com/jeffshaver/safe-app/pull/73)
* [[3036bf9](https://github.com/jeffshaver/safe-app/commit/3036bf9)] - add hydrateable decorator ([jpkeyw](https://github.com/jpkeyw)) [#66](https://github.com/jeffshaver/safe-app/pull/66)
* [[29835d4](https://github.com/jeffshaver/safe-app/commit/29835d4)] - allow filters to be deleted ([knorris](https://github.com/knorris))

### Depedency updates
  * update `babel-cli` to `6.7.5`
  * update `babel-core` to `6.7.6`
  * update `babel-eslint` to `6.0.2`
  * update `eslint` to `2.7.0`
  * update `eslint-plugin-react` to `4.3.0`
  * update `nock` to `8.0.0`
  * update `webpack` to `1.12.15`
  * update `mongodb` to `2.1.16`
  * update `react` to `15.0.1`
  * update `react-dom`,  to `15.0.1`
  * update `react-highcharts` to `8.1.1`
  * update `react-leaflet` to `0.11.0`
  * update `react-redux` to `4.4.4`
  * update `react-router` to `2.1.1`
  * update `react-router-redux` to `4.0.2`
  * update `react-tap-event-plugin` to `1.0.0`
  * update `redux` to `3.4.0`
  * update `safe-framework` to `0.0.15`

## 0.0.5 (Apr 12, 2016)

### Changes

* [[ba1cb4f](https://github.com/jeffshaver/safe-app/commit/ba1cb4f)] - filters now get ids. filter values are now the names ([jeffshaver](https://github.com/jeffshaver))
* [[be1a17a](https://github.com/jeffshaver/safe-app/commit/be1a17a)] - standardize redux action payloads ([jeffshaver](https://github.com/jeffshaver))
* [[45f6896](https://github.com/jeffshaver/safe-app/commit/45f6896)] - standardize file naming conventions ([jeffshaver](https://github.com/jeffshaver))
* [[007f791](https://github.com/jeffshaver/safe-app/commit/007f791)] - minor csv parsing changes. add accept attribute to file input ([jeffshaver](https://github.com/jeffshaver))
* [[a51ae46](https://github.com/jeffshaver/safe-app/commit/a51ae46)] - initial csv upload screen ([jpkeyw](https://github.com/jpkeyw)) [#59](https://github.com/jeffshaver/safe-app/pull/59)
* [[ce94cf2](https://github.com/jeffshaver/safe-app/commit/ce94cf2)] - implement redux for search ([knorris](https://github.com/knorris)) [#57](https://github.com/jeffshaver/safe-app/pull/57)
* [[9f01cc3](https://github.com/jeffshaver/safe-app/commit/9f01cc3)] - move route definitions below mongo config ([jeffshaver](https://github.com/jeffshaver))

## 0.0.4 (Apr 1, 2016)

### Changes

* [[e7bb9ec](https://github.com/jeffshaver/safe-app/commit/e7bb9ec)] - left nav and header redesign ([cafedavid](https://github.com/cafedavid)) [#49](https://github.com/jeffshaver/safe-app/pull/49)
* [[85117a7](https://github.com/jeffshaver/safe-app/commit/85117a7)] - create config before npm install ([jeffshaver](https://github.com/jeffshaver))
* [[7830d3f](https://github.com/jeffshaver/safe-app/commit/7830d3f)] - add prepublish script to run linting and tests ([jeffshaver](https://github.com/jeffshaver))
* [[60aca36](https://github.com/jeffshaver/safe-app/commit/60aca36)] - change the / route to the Home component ([jeffshaver](https://github.com/jeffshaver))
* [[22993ac](https://github.com/jeffshaver/safe-app/commit/22993ac)] - es2015 changes for server.js ([jeffshaver](https://github.com/jeffshaver))
* [[bb33c8f](https://github.com/jeffshaver/safe-app/commit/bb33c8f)] - update server.js. move dispatch calls to componentWillMount ([jeffshaver](https://github.com/jeffshaver))

### Depedency updates

* update `babel-core` to `6.7.4`
* update `babel-eslint` to `6.0.0`
* update `babel-polyfill` to `6.7.4`
* update `eslint` to `2.5.3`
* update `eslint-plugin-react` to `4.2.3`
* update `expect` to `1.16.0`
* update `nock` to `7.7.2`
* update `webpack-dev-middleware` to `1.6.1`
* update `connect-mongo` to `1.1.0`
* update `cookie-parser` to `1.4.1`
* update `errorhandler` to `1.4.3`
* update `express-session` to `1.13.0`
* update `mongodb` to `2.1.14`
* update `morgan` to `1.7.0`
* update `radium` to `0.17.1`
* update `react` to `0.14.8`
* update `react-dom` to `0.14.8`
* update `react-highcharts` to `8.0.3`
* update `react-tap-event-plugin` to `0.2.2`
* update `safe-framework` to `0.0.12`
* update `serve-static` to `1.10.2`

## 0.0.3 (Mar 28, 2016)

### Changes

* [[c86e955](https://github.com/jeffshaver/safe-app/commit/c86e955)] - initial authentication hook ([jeffshaver](https://github.com/jeffshaver))

## 0.0.2 (Mar 23, 2016)

### Changes

* [[5743b03](https://github.com/jeffshaver/safe-app/commit/5743b03)] - add script to bump version number ([jeffshaver](https://github.com/jeffshaver))
* [[49c92ef](https://github.com/jeffshaver/safe-app/commit/49c92ef)] - initial safe-rest integration ([jeffshaver](https://github.com/jeffshaver))
* [[90d093e](https://github.com/jeffshaver/safe-app/commit/90d093e)] - switch to browser history from hash history ([jeffshaver](https://github.com/jeffshaver))
* [[e07dc37](https://github.com/jeffshaver/safe-app/commit/e07dc37)] - pint eslint to 2.2.0 for now ([jeffshaver](https://github.com/jeffshaver))
* [[f60325b](https://github.com/jeffshaver/safe-app/commit/f60325b)] - only use hmr in dev mode ([jeffshaver](https://github.com/jeffshaver))
* [[fba0110](https://github.com/jeffshaver/safe-app/commit/fba0110)] - break up App.jsx ([jeffshaver](https://github.com/jeffshaver)
* [[25be4ce](https://github.com/jeffshaver/safe-app/commit/25be4ce)] - force webpack to also write to disk ([jeffshaver](https://github.com/jeffshaver))
* [[00b49fc](https://github.com/jeffshaver/safe-app/commit/00b49fc)] - self-host roboto font ([jeffshaver](https://github.com/jeffshaver))
* [[5c9311d](https://github.com/jeffshaver/safe-app/commit/5c9311d)] - only render needed elements on Analytics page ([jeffshaver](https://github.com/jeffshaver))
* [[8c206c9](https://github.com/jeffshaver/safe-app/commit/8c206c9)] - add caching to travis-ci config ([jeffshaver](https://github.com/jeffshaver))
* [[87767ff](https://github.com/jeffshaver/safe-app/commit/87767ff)] - eslint compliance ([jeffshaver](https://github.com/jeffshaver))
* [[1bae092](https://github.com/jeffshaver/safe-app/commit/1bae092)] - finalize Analytics.jsx connection to redux ([jeffshaver](https://github.com/jeffshaver))
* [[18886bc](https://github.com/jeffshaver/safe-app/commit/18886bc)] - fix gulp, tests and tap-event-plugin ([jeffshaver](https://github.com/jeffshaver))
* [[334e1e6](https://github.com/jeffshaver/safe-app/commit/334e1e6)] - update travis-ci config to use node 5.7.0 ([jeffshaver](https://github.com/jeffshaver))
* [[cd76701](https://github.com/jeffshaver/safe-app/commit/cd76701)] - more redux implementation ([jeffshaver](https://github.com/jeffshaver))
* [[5b4a9d9](https://github.com/jeffshaver/safe-app/commit/5b4a9d9)] - initial travis-ci integration ([jeffshaver](https://github.com/jeffshaver))
* [[4f28d1a](https://github.com/jeffshaver/safe-app/commit/4f28d1a)] - add sample routes/fixtures ([cafedavid](https://github.com/cafedavid))
* [[5bb6ed0](https://github.com/jeffshaver/safe-app/commit/5bb6ed0)] - initial redux and testing implementation ([jeffshaver](https://github.com/jeffshaver))
* [[c6ad16d](https://github.com/jeffshaver/safe-app/commit/c6ad16d)] - add initial server implementation ([cafedavid](https://github.com/cafedavid))

### Depedency updates

* update `babel-cli` to `6.6.5`
* update `babel-core` to `6.7.2`
* update `babel-plugin-react-transform` to `2.0.2`
* update `babel-polyfill` to `6.7.2`
* update `babel-preset-es2105` to `6.6.0`
* update `babel-register` to `6.7.2`
* update `babel-runtime` to `6.6.1`
* update `deep-freeze` to `0.0.1`
* update `eslint-plugin-promise` to `1.1.0`
* update `eslint-plugin-react` to `4.2.2`
* update `expect` to `1.15.2`
* update `react-transform-hmr` to `1.0.4`
* update `redux-mock-store` to `1.0.2`
* update `webpack-hot-middleware` to `2.10.0`
* update `color` to `0.11.1`
* update `express` to `4.13.4`
* update `isomorphic-fetch` to `2.2.1`
* update `material-ui` to `0.14.4`
* update `radium` to `0.16.6`
* update `react` to `0.14.7`
* update `react-dom` to `0.14.7`
* update `react-highcharts` to `8.0.2`
* update `react-leaflet` to `0.10.2`
* update `react-redux` to `4.4.1`
* update `react-router` to `2.0.1`
* update `redux` to `3.3.1`
* update `redux-thunk` to `2.0.1`
* update `safe-framework` to `0.0.11`

## 0.0.1 (Feb 2, 2016)

* [[329552f](https://github.com/jeffshaver/safe-app/commit/329552f)] - initial commit ([jeffshaver](https://github.com/jeffshaver))