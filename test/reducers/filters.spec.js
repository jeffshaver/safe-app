/* globals describe, it */

import {fromJS, List, Map} from 'immutable'
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
    const stateAfter = List([Map({
      field: '',
      id: 0,
      operator: '',
      value: ''
    })])

    expect(reducer(undefined, {})).toEqual(stateAfter)
  })

  it('should handle ADD_FILTER', () => {
    const stateBefore = List()
    const filter = {
      field: 'fieldA',
      id: 1,
      operator: '=',
      value: 'fieldAValue'
    }
    const action = {
      type: ADD_FILTER,
      payload: {filter}
    }
    const stateAfter = List([Map(filter)])

    deepFreeze(action)

    expect(reducer(stateBefore, action)).toEqual(stateAfter)
  })

  it('should handle EDIT_FILTER', () => {
    const stateBefore = fromJS([{
      field: 'fieldA',
      id: 0,
      operator: '=',
      value: 'fieldAValue'
    }, {
      field: 'fieldB',
      id: 1,
      operator: '<=',
      value: 'fieldBValue'
    }])
    const action = {
      type: EDIT_FILTER,
      payload: {
        value: {operator: '>='},
        index: 0
      }
    }
    const stateAfter = fromJS([{
      field: 'fieldA',
      id: 0,
      operator: '>=',
      value: 'fieldAValue'
    }, {
      field: 'fieldB',
      id: 1,
      operator: '<=',
      value: 'fieldBValue'
    }])

    deepFreeze(action)

    expect(reducer(stateBefore, action)).toEqual(stateAfter)
  })

  it('should handle REMOVE_FILTER', () => {
    const stateBefore = fromJS([{
      field: 'fieldA',
      id: 0,
      operator: '=',
      value: 'fieldAValue'
    }, {
      field: 'fieldB',
      id: 1,
      operator: '<=',
      value: 'fieldBValue'
    }])
    const action = {
      type: REMOVE_FILTER,
      payload: {
        index: 0
      }
    }
    const stateAfter = fromJS([{
      field: 'fieldB',
      id: 1,
      operator: '<=',
      value: 'fieldBValue'
    }])

    deepFreeze(action)

    expect(reducer(stateBefore, action)).toEqual(stateAfter)
  })

  it('should handle RESET_FILTERS', () => {
    const stateBefore = fromJS([{
      id: 0,
      field: 'fieldA',
      operator: '=',
      value: 'fieldAValue'
    }, {
      id: 1,
      field: 'fieldB',
      operator: '<=',
      value: 'fieldBValue'
    }])
    const action = {
      type: RESET_FILTERS
    }
    const stateAfter = fromJS([{
      field: '',
      id: 0,
      operator: '',
      value: ''
    }])

    deepFreeze(action)

    expect(reducer(stateBefore, action)).toEqual(stateAfter)
  })
})