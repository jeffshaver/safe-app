import {combineReducers} from 'redux'
import {routerReducer as routing} from 'react-router-redux'
import analytic from './analytic'
import analytics from './analytics'
import fields from './fields'
import filters from './filters'
import source from './source'
import sources from './sources'
import user from './user'
import visualization from './visualization'
import visualizations from './visualizations'

export {analytic}
export {analytics}
export {fields}
export {filters}
export {source}
export {sources}
export {user}
export {visualization}
export {visualizations}

export const rootReducer = combineReducers({
  analytic,
  analytics,
  fields,
  filters,
  source,
  sources,
  user,
  visualization,
  visualizations,

  // for react-router-redux
  routing
})