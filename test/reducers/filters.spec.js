/* globals describe, it */

import expect from 'expect'
import {
  ADD_FILTER,
  EDIT_FILTER,
  REMOVE_FILTER,
  RESET_FILTERS
} from '../../src/js/actionTypes'
import {
  filters as reducer
} from '../../src/js/reducers'

describe('filters reducer', () => {
  it('should return the initial state', () => {
    const expectedValue = [{
      id: 0,
      field: '',
      operator: '',
      value: ''
    }]

    expect(reducer(undefined, {})).toEqual(expectedValue)
  })

  it('should handle ADD_FILTER', () => {
    const filter = {
      id: 0,
      field: 'fieldA',
      operator: '=',
      value: 'fieldAValue'
    }

    expect(reducer([], {
      type: ADD_FILTER,
      value: filter
    })).toEqual([filter])
  })

  it('should handle EDIT_FILTER', () => {
    const existingFilters = [{
      id: 0,
      field: 'fieldA',
      operator: '=',
      value: 'fieldAValue'
    }, {
      id: 1,
      field: 'fieldB',
      operator: '<=',
      value: 'fieldBValue'
    }]

    const expectedFilters = [{
      id: 0,
      field: 'fieldA',
      operator: '>=',
      value: 'fieldAValue'
    }, {
      id: 1,
      field: 'fieldB',
      operator: '<=',
      value: 'fieldBValue'
    }]

    const index = 0
    const operator = '>='

    expect(reducer(existingFilters, {
      type: EDIT_FILTER,
      value: {operator},
      index
    })).toEqual(expectedFilters)
  })

  it('should handle REMOVE_FILTER', () => {
    const existingFilters = [{
      id: 0,
      field: 'fieldA',
      operator: '=',
      value: 'fieldAValue'
    }, {
      id: 1,
      field: 'fieldB',
      operator: '<=',
      value: 'fieldBValue'
    }]
    const expectedFilters = [{
      id: 1,
      field: 'fieldB',
      operator: '<=',
      value: 'fieldBValue'
    }]

    expect(reducer(existingFilters, {
      type: REMOVE_FILTER,
      index: 0
    })).toEqual(expectedFilters)
  })

  it('should handle RESET_FILTERS', () => {
    const existingFilters = [{
      id: 0,
      field: 'fieldA',
      operator: '=',
      value: 'fieldAValue'
    }, {
      id: 1,
      field: 'fieldB',
      operator: '<=',
      value: 'fieldBValue'
    }]

    expect(reducer(existingFilters, {
      type: RESET_FILTERS
    })).toEqual([])
  })
})