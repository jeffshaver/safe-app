/* globals describe, it */

import deepFreeze from 'deep-freeze'
import expect from 'expect'
import {
  ADD,
  addFilter,
  EDIT,
  editFilter,
  HYDRATE,
  hydrateFilters,
  default as reducer,
  REMOVE,
  removeFilter,
  RESET,
  resetFilters
} from '../../src/js/modules/filters'

describe('filter actions', () => {
  it('addFilter should create an ADD action', () => {
    const filter = {
      id: 0,
      field: 'fieldA',
      operator: '=',
      value: 'fieldAValue'
    }
    const expectedAction = {
      type: ADD,
      payload: {filter}
    }

    expect(addFilter(filter)).toEqual(expectedAction)
  })

  it('editFilter should create an EDIT action', () => {
    const index = 0
    const value = 'value'
    const expectedAction = {
      type: EDIT,
      payload: {index, value}
    }

    expect(editFilter(index, value)).toEqual(expectedAction)
  })

  it('hydrateFilters should create a HYDRATE action', () => {
    const filters = [{
      id: 0,
      field: 'fieldA',
      operator: '=',
      value: 'fieldAValue'
    }]
    const expectedAction = {
      type: HYDRATE,
      state: filters
    }

    expect(hydrateFilters(filters)).toEqual(expectedAction)
  })

  it('removeFilter should create a REMOVE action', () => {
    const index = 0
    const expectedAction = {
      type: REMOVE,
      payload: {index}
    }

    expect(removeFilter(index)).toEqual(expectedAction)
  })

  it('resetFilters should createa RESET action', () => {
    const expectedAction = {
      type: RESET
    }

    expect(resetFilters()).toEqual(expectedAction)
  })
})

describe('filters reducer', () => {
  it('should return the initial state', () => {
    const stateAfter = [{
      id: 0,
      field: '',
      operator: '',
      value: ''
    }]

    expect(reducer(undefined, {})).toEqual(stateAfter)
  })

  it('should handle ADD', () => {
    const stateBefore = []
    const filter = {
      field: 'fieldA',
      operator: '=',
      value: 'fieldAValue'
    }
    const action = {
      type: ADD,
      payload: {filter}
    }
    const stateAfter = [{
      ...filter,
      id: 1
    }]

    deepFreeze(stateBefore)
    deepFreeze(action)

    expect(reducer(stateBefore, action)).toEqual(stateAfter)
  })

  it('should handle EDIT', () => {
    const stateBefore = [{
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
    const action = {
      type: EDIT,
      payload: {
        value: {operator: '>='},
        index: 0
      }
    }
    const stateAfter = [{
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

    deepFreeze(stateBefore)
    deepFreeze(action)

    expect(reducer(stateBefore, action)).toEqual(stateAfter)
  })

  it('should handle REMOVE', () => {
    const stateBefore = [{
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
    const action = {
      type: REMOVE,
      payload: {
        index: 0
      }
    }
    const stateAfter = [{
      id: 1,
      field: 'fieldB',
      operator: '<=',
      value: 'fieldBValue'
    }]

    deepFreeze(stateBefore)
    deepFreeze(action)

    expect(reducer(stateBefore, action)).toEqual(stateAfter)
  })

  it('should handle RESET', () => {
    const stateBefore = [{
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
    const action = {
      type: RESET
    }
    const stateAfter = []

    deepFreeze(stateBefore)
    deepFreeze(action)

    expect(reducer(stateBefore, action)).toEqual(stateAfter)
  })
})