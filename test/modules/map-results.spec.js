/* globals describe, it */

import expect from 'expect'
import {
  default as reducer,
  SET,
  setMapResults
} from '../../src/js/modules/map-results'

describe('mapResults actions', () => {
  it('setMapResults should create a SET action', () => {
    const mapResults = {
      center: [39.73, -104.99],
      markers: [
        {key: 'Littleton', position: [39.61, -105.02], children: 'This is Littleton, CO'},
        {key: 'Denver', position: [39.74, -104.99], children: 'This is Denver, CO'},
        {key: 'Aurora', position: [39.73, -104.81], children: 'This is Aurora, CO'},
        {key: 'Golden', position: [39.77, -105.23], children: 'This is Golden, CO'}
      ]
    }
    
    const expectedAction = {
      type: SET,
      payload: {mapResults}
    }

    expect(setMapResults(mapResults)).toEqual(expectedAction)
  })
})

describe('mapResults reducer', () => {
  it('should return the initial state', () => {
    const stateAfter = {
      center: [39.904, -77.016],
      markers: []
    }

    expect(reducer(undefined, {})).toEqual(stateAfter)
  })

  it('should handle SET', () => {
    const stateAfter = {
      center: [39.73, -104.99],
      markers: [
        {key: 'Littleton', position: [39.61, -105.02], children: 'This is Littleton, CO'},
        {key: 'Denver', position: [39.74, -104.99], children: 'This is Denver, CO'},
        {key: 'Aurora', position: [39.73, -104.81], children: 'This is Aurora, CO'},
        {key: 'Golden', position: [39.77, -105.23], children: 'This is Golden, CO'}
      ]
    }
    
    const action = {
      type: SET,
      payload: {mapResults: stateAfter}
    }

    expect(reducer(undefined, action)).toEqual(stateAfter)
  })
})