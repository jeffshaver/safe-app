import {combineReducers} from 'redux'
import {routerReducer as routing} from 'react-router-redux'
import analytic from './analytic'
import analytics from './analytics'
import dialog from './dialog'
import fields from './fields'
import filters from './filters'
import searchResults from './searchResults'
import source from './source'
import sources from './sources'
import uploadDataTypes from './upload-data-types'
import user from './user'
import visualization from './visualization'
import visualizations from './visualizations'

export {analytic}
export {analytics}
export {dialog}
export {fields}
export {filters}
export {searchResults}
export {source}
export {sources}
export {uploadDataTypes}
export {user}
export {visualization}
export {visualizations}

export const rootReducer = combineReducers({
  analytic,
  analytics,
  dialog,
  fields,
  filters,
  searchResults,
  source,
  sources,
  uploadDataTypes,
  user,
  visualization,
  visualizations,

  // for react-router-redux
  routing
})