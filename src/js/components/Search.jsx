import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {Hydrateable} from '../decorators'
import FilterCriteria from './FilterCriteria'
import SourceSelect from './SourceSelect'
import {BasicDataTable} from 'safe-framework'
import {RaisedButton} from 'material-ui'
import {fetchFields} from '../modules/fields'
import {addFilter, editFilter, removeFilter} from '../modules/filters'
import {fetchSearchResults} from '../modules/search-results'
import {setSource} from '../modules/source'
import {fetchSources} from '../modules/sources'
import {header, main} from '../styles/common'

const style = {
  hidden: {
    display: 'none'
  },
  sourceSelect: {
    display: 'block'
  },
  button: {
    margin: '1.5em 0'
  },
  verticalTop: {
    verticalAlign: 'top'
  }
}

@Hydrateable('Search', ['filters', 'source'])
class Search extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    filters: PropTypes.array.isRequired,
    searchResults: PropTypes.object.isRequired,
    source: PropTypes.string.isRequired
  }

  constructor (props) {
    super(props)

    this.displayName = 'Search'

    this.onAddFilter = ::this.onAddFilter
    this.onChangeField = ::this.onChangeField
    this.onChangeOperator = ::this.onChangeOperator
    this.onChangeSource = ::this.onChangeSource
    this.onChangeValue = ::this.onChangeValue
    this.onClick = ::this.onClick
    this.onRemoveFilter = ::this.onRemoveFilter
  }

  componentWillMount () {
    const {dispatch} = this.props

    dispatch(fetchSources())
  }

  onAddFilter (ev) {
    const {dispatch} = this.props

    ev.preventDefault()
    dispatch(addFilter({
      field: '',
      operator: '',
      value: ''
    }))
  }

  onChangeField (index, field) {
    const {dispatch} = this.props

    dispatch(editFilter(index, {field}))
  }

  onChangeOperator (index, operator) {
    const {dispatch} = this.props

    dispatch(editFilter(index, {operator}))
  }

  onChangeSource (ev, index, source) {
    const {dispatch} = this.props

    ev.preventDefault()
    dispatch(setSource(source))
    dispatch(fetchFields(source))
  }

  onChangeValue (index, value) {
    const {dispatch} = this.props

    dispatch(editFilter(index, {value}))
  }

  onClick () {
    const {dispatch, source, filters} = this.props

    dispatch(fetchSearchResults(source, filters))
  }

  onRemoveFilter (ev, index) {
    const {dispatch} = this.props

    ev.preventDefault()
    dispatch(removeFilter(index))
  }

  render () {
    const {source, searchResults} = this.props
    const filterStyle = source === ''
      ? style.hidden
      : {}

    return (
      <div>
        <header style={header}>
          <h1>Search</h1>
        </header>
        <main style={main}>
          <SourceSelect
            style={{
              ...style.verticalTop,
              ...style.sourceSelect
            }}
            onChange={this.onChangeSource}
          />
          <FilterCriteria
            style={style.verticalTop}
            wrapperStyle={filterStyle}
            onAdd={this.onAddFilter}
            onChangeField={this.onChangeField}
            onChangeOperator={this.onChangeOperator}
            onChangeValue={this.onChangeValue}
            onRemove={this.onRemoveFilter}
          />
          <RaisedButton
            disabled={!source}
            label='Search'
            primary={true}
            style={style.button}
            onTouchTap={this.onClick}
          />
          {(() => {
            if (searchResults.data && searchResults.data.length > 0) {
              const columns = Object.keys(searchResults.data[0]).map((data) => ({
                title: data.toUpperCase(),
                data
              }))

              return (
                <div>
                  <h2>Results</h2>
                  <BasicDataTable
                    columns={columns}
                    data={searchResults.data}
                  />
                </div>
              )
            }
          })()}
        </main>
      </div>
    )
  }
}

export default connect((state) => ({
  filters: state.filters,
  searchResults: state.searchResults,
  source: state.source
}))(Search)