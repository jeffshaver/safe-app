import {applicationName} from '../../../config'
import {connect} from 'react-redux'
import {fetchFields} from '../modules/fields'
import {fetchSearchResults} from '../modules/search-results'
import {fetchSources} from '../modules/sources'
import FilterCriteria from './FilterCriteria'
import {LogMetrics} from '../decorators'
import {setFilters} from '../modules/filters'
import {setSource} from '../modules/source'
import Visualization from './visualization/Visualization'
import {CircularProgress, SelectField} from 'safe-framework'
import {
  excludeEmptyFilters,
  filtersToArray,
  getDefaultFilters,
  getNameByID,
  validateFilters
} from '../modules/utilities'
import {grey300, white} from 'material-ui/styles/colors'
import {header, headerAppName, main, verticalTop} from '../styles/common'
import React, {Component, PropTypes} from 'react'

const style = {
  button: {
    margin: '1.5em 0'
  },
  h1: {
    margin: 0
  },
  hidden: {
    display: 'none'
  },
  margin: {
    margin: '12px'
  },
  progress: {
    left: '.5em',
    top: '1.2em'
  },
  results: {
    marginTop: '.5em',
    height: '500px'
  },
  span: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    'transform': 'translate(-50%, -50%)'
  },
  wrapper: {
    background: white,
    border: `1px solid ${grey300}`,
    height: '510px',
    margin: '.5em 0 0 0',
    position: 'relative'
  }
}
const generateColumns = (data) => {
  if (data.data.length === 0) {
    console.error('generateColumns(): data is undefined')

    return []
  }

  return Object.keys(data.data[0]).map((field) => ({
    headerName: field.toUpperCase(),
    field
  }))
}

@LogMetrics('Search')
class Search extends Component {
  static propTypes = {
    category: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
    fields: PropTypes.object.isRequired,
    filters: PropTypes.array.isRequired,
    searchResults: PropTypes.object.isRequired,
    source: PropTypes.string.isRequired,
    sources: PropTypes.object.isRequired
  }

  constructor (props) {
    super(props)

    this.displayName = 'Search'
    this.state = {
      columns: []
    }
    this.onChangeSource = ::this.onChangeSource
    this.onClickSubmit = ::this.onClickSubmit
  }

  updateColumns (data) {
    if (data.data.length === 0) {
      return
    }

    this.setState({
      columns: generateColumns(data)
    })
  }

  componentWillMount () {
    const {dispatch, searchResults} = this.props

    this.updateColumns(searchResults)

    dispatch(fetchSources())
  }

  componentWillReceiveProps (nextProps) {
    const {searchResults, source, fields} = this.props

    if (searchResults !== nextProps.searchResults) {
      this.updateColumns(nextProps.searchResults)
    }

    if (source !== nextProps.source || fields !== nextProps.fields) {
      this.resetFilters(nextProps.source, nextProps.fields.data)
    }
  }

  resetFilters (source, fields) {
    const {dispatch} = this.props

    dispatch(setFilters(
      source,
      getDefaultFilters(fields, [])
    ))
  }

  validateFilters = () => {
    const {source, filters} = this.props

    return validateFilters(filters[source])
  }

  onChangeSource (ev, index, source) {
    const {dispatch} = this.props

    ev.preventDefault()
    dispatch(setSource(source))
    dispatch(fetchFields(source))
  }

  renderSearchResults () {
    const {dispatch, searchResults} = this.props

    if (!searchResults) {
      return null
    }

    if (searchResults.isFetching) {
      return (
        <div style={style.wrapper}>
          <CircularProgress
            size={0.5}
            spanStyle={style.span}
            style={style.progress}
          />
        </div>
      )
    }

    const {data = []} = searchResults

    if (data.length === 0) {
      return <div />
    }

    const visualization = {
      _id: '',
      name: 'Search Results',
      visualizationType: {
        name: 'Table'
      }
    }

    return (
      <div style={style.results}>
        <Visualization
          dispatch={dispatch}
          results={searchResults}
          visualization={visualization}
        />
      </div>
    )
  }

  onClickReset = () => {
    const {source, fields} = this.props

    this.resetFilters(source, fields.data)
  }

  onClickSubmit () {
    const {dispatch, filters, source} = this.props

    dispatch(fetchSearchResults(source, excludeEmptyFilters(filtersToArray(filters[source]))))
  }

  render () {
    const {
      fields,
      source,
      sources
    } = this.props
    const filterStyle = source === ''
      ? style.hidden
      : {}

    const label = 'Search_' + getNameByID(sources.data, source) + `_${source}`

    return (
      <div>
        <header style={header}>
          <p style={headerAppName}>{applicationName}</p>
          <h1 style={style.h1}>Search</h1>
        </header>
        <main style={main}>
          <SelectField
            floatingLabelText='Select a data source'
            hintText='Select a data source'
            isFetching={sources.isFetching}
            items={sources.data}
            keyProp={'_id'}
            primaryTextProp={'name'}
            style={verticalTop}
            value={source}
            valueProp={'_id'}
            onChange={this.onChangeSource}
          />
          <FilterCriteria
            containerId={source}
            fields={fields}
            label={label}
            style={verticalTop}
            valid={this.validateFilters()}
            wrapperStyle={filterStyle}
            onClickReset={this.onClickReset}
            onClickSubmit={this.onClickSubmit}
          />
          {this.renderSearchResults()}
        </main>
      </div>
    )
  }
}

export default connect((state) => ({
  category: state.category,
  fields: state.fields,
  filters: state.filters,
  searchResults: state.searchResults,
  source: state.source,
  sources: state.sources
}))(Search)