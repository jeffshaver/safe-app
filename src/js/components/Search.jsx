import {connect} from 'react-redux'
import {fetchFields} from '../modules/fields'
import {fetchSearchResults} from '../modules/search-results'
import {fetchSources} from '../modules/sources'
import FilterCriteria from './FilterCriteria'
import MetricsWrapper from './MetricsWrapper'
import RaisedButton from 'material-ui/RaisedButton'
import {setSource} from '../modules/source'
import {CircularProgress, DataTable, SelectField} from 'safe-framework'
import {excludeEmptyFilters, getNameByID} from '../modules/utilities'
import {grey300, white} from 'material-ui/styles/colors'
import {header, main, verticalTop} from '../styles/common'
import {Hydrateable, LogMetrics} from '../decorators'
import React, {Component, PropTypes} from 'react'

const style = {
  button: {
    margin: '1.5em 0'
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
@Hydrateable('Search', ['filters', 'source'])
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
    this.onClickSearch = ::this.onClickSearch
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
    const {searchResults} = this.props

    if (searchResults === nextProps.searchResults) {
      return
    }

    this.updateColumns(nextProps.searchResults)
  }

  onChangeSource (ev, index, source) {
    const {dispatch} = this.props

    ev.preventDefault()
    dispatch(setSource(source))
    dispatch(fetchFields(source))
  }

  renderSearchResults () {
    const {searchResults} = this.props

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

    return (
      <div style={style.wrapper}>
        <DataTable
          columns={this.state.columns}
          data={searchResults.data}
          enableColResize='true'
          enableSorting='true'
        />
      </div>
    )
  }

  onClickSearch () {
    const {dispatch, filters, source} = this.props
  
    dispatch(fetchSearchResults(source, excludeEmptyFilters(filters)))
  }

  render () {
    const {
      fields,
      filters,
      source,
      sources
    } = this.props
    const filterStyle = source === ''
      ? style.hidden
      : {}
    
    const sourceName = getNameByID(sources.data, source)
    const label = source === '' ? 'Search' : `Search_${sourceName}_${source}`
    const searchFilters = excludeEmptyFilters(filters)

    return (
      <div>
        <header style={header}>
          <h1>Search</h1>
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
            fields={fields}
            style={verticalTop}
            wrapperStyle={filterStyle}
          />
          <div>
            <MetricsWrapper
              component={
                <RaisedButton
                  disabled={!source}
                  label='Search'
                  primary={true}
                  style={style.button}
                />}
              data={{filters: searchFilters}}
              label={label}
              onTouchTap={this.onClickSearch}
            />
          </div>
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