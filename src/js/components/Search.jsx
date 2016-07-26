import {connect} from 'react-redux'
import {excludeEmptyFilters} from '../modules/utilities'
import {fetchFields} from '../modules/fields'
import {fetchSearchResults} from '../modules/search-results'
import {fetchSources} from '../modules/sources'
import FilterCriteria from './FilterCriteria'
import RaisedButton from 'material-ui/RaisedButton'
import {setSource} from '../modules/source'
import Tab from 'material-ui/Tabs/Tab'
import Tabs from 'material-ui/Tabs/Tabs'
import {CircularProgress, DataTable, SelectField} from 'safe-framework'
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
const size = 'col-xs-12 col-sm-12'

@LogMetrics('pageView', 'Search')
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

  onClickSearch () {
    const {dispatch, filters, source} = this.props

    dispatch(fetchSearchResults(source, excludeEmptyFilters(filters)))
  }

  render () {
    const {
      fields,
      searchResults,
      source,
      sources
    } = this.props
    const filterStyle = source === ''
      ? style.hidden
      : {}

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
            <RaisedButton
              disabled={!source}
              label='Search'
              primary={true}
              style={style.button}
              onTouchTap={this.onClickSearch}
            />
          </div>
          {(() => {
            if (!searchResults) {
              return null
            }

            if (searchResults.isFetching) {
              return (
                <CircularProgress
                  size={0.5}
                  spanStyle={style.span}
                  style={style.progress}
                />
              )
            }

            const {data = []} = searchResults
        
            if (data.length === 0) {
              return <div />
            }
            
            return (
              <div className={size}>
                <Tabs>
                  <Tab label='Data'>
                     <div style={{height: '350px'}}>
                      <DataTable
                        columns={this.state.columns}
                        data={searchResults.data}
                        enableColResize='true'
                        enableSorting='true'
                      />
                    </div>
                  </Tab>
                </Tabs>
              </div>
            )
          })()}
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