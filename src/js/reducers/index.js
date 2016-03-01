import {combineReducers} from 'redux'
import {routerReducer as routing} from 'react-router-redux'
import fields from './fields'
import filters from './filters'
import source from './source'
import sources from './sources'

export {fields}
export {filters}
export {source}
export {sources}

export const rootReducer = combineReducers({
  fields,
  filters,
  source,
  sources,

  // for react-router-redux
  routing
})