/* globals describe, it */

import expect from 'expect'
import deepFreeze from 'deep-freeze'
import {
  ADD_FILTER,
  EDIT_FILTER,
  REMOVE_FILTER,
  RESET_FILTERS
} from '../../src/js/action-types'
import {
  filters as reducer
} from '../../src/js/reducers'

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

  it('should handle ADD_FILTER', () => {
    const stateBefore = []
    const filter = {
      id: 0,
      field: 'fieldA',
      operator: '=',
      value: 'fieldAValue'
    }
    const action = {
      type: ADD_FILTER,
      payload: {filter}
    }
    const stateAfter = [filter]

    deepFreeze(stateBefore)
    deepFreeze(action)

    expect(reducer(stateBefore, action)).toEqual(stateAfter)
  })

  it('should handle EDIT_FILTER', () => {
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
      type: EDIT_FILTER,
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

  it('should handle REMOVE_FILTER', () => {
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
      type: REMOVE_FILTER,
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

  it('should handle RESET_FILTERS', () => {
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
      type: RESET_FILTERS
    }
    const stateAfter = []

    deepFreeze(stateBefore)
    deepFreeze(action)

    expect(reducer(stateBefore, action)).toEqual(stateAfter)
  })
})