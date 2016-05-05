import {connect} from 'react-redux'
import {DataTable} from 'safe-framework'
import {fetchFields} from '../modules/fields'
import {fetchSearchResults} from '../modules/search-results'
import {fetchSources} from '../modules/sources'
import FilterCriteria from './FilterCriteria'
import {Hydrateable} from '../decorators'
import {SelectField} from './SelectField'
import {setCategory} from '../modules/category'
import {setLabel} from '../modules/label'
import {setLatitude} from '../modules/latitude'
import {setLongitude} from '../modules/longitude'
// import {setMapResults} from '../modules/map-results'
import {setSource} from '../modules/source'
import {header, main, verticalTop} from '../styles/common'
import {RaisedButton, Tab, Tabs} from 'material-ui'
import React, {Component, PropTypes} from 'react'

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
  margin: {
    margin: '12px'
  }
}

// const mapTitle = 'Cities'
const size = 'col-xs-12 col-sm-12'
// const zoomControlPosition = 'topleft'

@Hydrateable('Search', ['filters', 'source'])
class Search extends Component {
  static propTypes = {
    category: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
    filters: PropTypes.array.isRequired,
    // label: PropTypes.string.isRequired,
    // latitude: PropTypes.string.isRequired,
    // longitude: PropTypes.string.isRequired,
    // mapResults: PropTypes.object,
    searchResults: PropTypes.object.isRequired,
    source: PropTypes.string.isRequired,
    sources: PropTypes.object.isRequired
  }

  constructor (props) {
    super(props)

    this.displayName = 'Search'

    this.onChangeCategory = ::this.onChangeCategory
    this.onChangeLabel = ::this.onChangeLabel
    this.onChangeLatitude = ::this.onChangeLatitude
    this.onChangeLongitude = ::this.onChangeLongitude
    this.onChangeSource = ::this.onChangeSource
    this.onClickDashboard = ::this.onClickDashboard
    this.onClickPlot = ::this.onClickPlot
    this.onClickSearch = ::this.onClickSearch
  }

  componentWillMount () {
    const {dispatch} = this.props

    dispatch(fetchSources())
  }

  onChangeCategory (ev, index, category) {
    const {dispatch} = this.props

    dispatch(setCategory(category))
  }

  onChangeLabel (ev, index, label) {
    const {dispatch} = this.props

    dispatch(setLabel(label))
  }

  onChangeLatitude (ev, index, latitude) {
    const {dispatch} = this.props

    dispatch(setLatitude(latitude))
  }

  onChangeLongitude (ev, index, longitude) {
    const {dispatch} = this.props

    dispatch(setLongitude(longitude))
  }

  onChangeSource (ev, index, source) {
    const {dispatch} = this.props

    ev.preventDefault()
    dispatch(setSource(source))
    dispatch(fetchFields(source))
  }

  onClickDashboard () {
  }

  onClickPlot () {
    // const {dispatch, label, latitude, longitude, searchResults} = this.props

    // // Verify selected fields contain lat/lon values
    // const lat = searchResults.data[0][latitude]
    // const long = searchResults.data[0][longitude]

    // if (
    //   Number(lat) !== lat ||
    //   Number(long) !== long ||
    //   lat < -90 ||
    //   lat > 90 ||
    //   long < -180 ||
    //   long > 180
    // ) {
    //   return
    // }

    // const markers = searchResults.data.map((row, i) => ({
    //   key: i,
    //   position: [row[latitude], row[longitude]],
    //   children: row[label]
    // }))

    // const mapResults = {
    //   center: [lat, long],
    //   markers: markers
    // }

    // dispatch(setMapResults(mapResults))
  }

  onClickSearch () {
    const {dispatch, source, filters} = this.props

    dispatch(fetchSearchResults(source, filters))
  }

  render () {
    const {
      // category,
      // label, latitude,
      // longitude,
      // mapResults,
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
            style={{...verticalTop, ...style.sourceSelect}}
            value={source}
            valueProp={'_id'}
            onChange={this.onChangeSource}
          />
          <FilterCriteria
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
            <RaisedButton
              disabled={!source}
              label='Add to Dashboard'
              style={style.margin}
              onTouchTap={this.onClickDashboard}
            />
          </div>
          {(() => {
            if (searchResults.data && searchResults.data.length > 0) {
              const columns = Object.keys(searchResults.data[0]).map((field) => ({
                headerName: field.toUpperCase(),
                field
              }))

              // const items = Object.keys(searchResults.data[0]).map((data, i) => ({
              //   value: i,
              //   primaryText: data
              // }))

              // const lat = searchResults.data[0][latitude]
              // const long = searchResults.data[0][longitude]

              // const isValidLatitude = latitude.length === 0 || (Number(lat) === lat && lat > -90 && lat < 90)
              // const isValidLongitude = longitude.length === 0 || (Number(long) === long && long > -180 && long < 180)

              return (
                <div className={size}>
                  <Tabs>
                    <Tab label='Data'>
                      <div style={{height: '350px'}}>
                        <DataTable
                          columns={columns}
                          data={searchResults.data}
                          enableColResize='true'
                          enableSorting='true'
                        />
                      </div>
                    </Tab>
                    {/* <Tab label='Map'>
                      <div>
                        <SelectField
                          errorText={!isValidLatitude && 'Select a latitude field'}
                          floatingLabelText='Select a Latitude'
                          hintText='Select a Latitude'
                          items={items}
                          keyProp={'value'}
                          primaryTextProp={'primaryText'}
                          style={verticalTop}
                          value={latitude}
                          valueProp={'value'}
                          onChange={this.onChangeLatitude}
                        />
                        <SelectField
                          errorText={!isValidLongitude && 'Select a longitude field'}
                          floatingLabelText='Select a Longitude'
                          hintText='Select a Longitude'
                          items={items}
                          keyProp={'value'}
                          primaryTextProp={'primaryText'}
                          style={verticalTop}
                          value={longitude}
                          valueProp={'value'}
                          onChange={this.onChangeLongitude}
                        />
                        <SelectField
                          floatingLabelText='Select a Label'
                          hintText='Select a label'
                          items={items}
                          keyProp={'value'}
                          primaryTextProp={'primaryText'}
                          style={verticalTop}
                          value={label}
                          valueProp={'value'}
                          onChange={this.onChangeLabel}
                        />
                        <RaisedButton
                          label='Plot'
                          primary={true}
                          style={style.button}
                          onTouchTap={this.onClickPlot}
                        />
                      </div>
                      <br/>
                      <div>
                        <Map
                          center={mapResults.center}
                          markers={mapResults.markers}
                          title={mapTitle}
                          zoomControlPosition={zoomControlPosition}
                        />
                      </div>
                    </Tab>*/}
                  </Tabs>
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
  category: state.category,
  filters: state.filters,
  label: state.label,
  latitude: state.latitude,
  longitude: state.longitude,
  mapResults: state.mapResults,
  searchResults: state.searchResults,
  source: state.source,
  sources: state.sources
}))(Search)