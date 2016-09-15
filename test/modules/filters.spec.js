/* globals describe, it */

import deepFreeze from 'deep-freeze'
import expect from 'expect'
import uuid from 'node-uuid'
import {
  ADD,
  addFilter,
  EDIT,
  editFilter,
  default as reducer,
  REMOVE,
  removeFilter,
  SET,
  setFilters
} from '../../src/js/modules/filters'

const containerId = '123abc'

describe('filter actions', () => {
  it('addFilter should create an ADD action', () => {
    const filter = {
      field: 'fieldA',
      operator: '=',
      required: false,
      value: 'fieldAValue'
    }
    const expectedAction = {
      type: ADD,
      payload: {containerId, filter}
    }
    const result = addFilter(containerId, filter)

    expectedAction.payload.id = result.payload.id

    expect(result).toEqual(expectedAction)
  })

  it('editFilter should create an EDIT action', () => {
    const id = uuid.v1()
    const value = 'value'
    const expectedAction = {
      type: EDIT,
      payload: {containerId, id, value}
    }

    expect(editFilter(containerId, id, value)).toEqual(expectedAction)
  })

  it('removeFilter should create a REMOVE action', () => {
    const id = uuid.v1()
    const expectedAction = {
      type: REMOVE,
      payload: {containerId, id}
    }

    expect(removeFilter(containerId, id)).toEqual(expectedAction)
  })

  it('setFilters should create a SET action', () => {
    const filters = {
      [uuid.v1()]: {
        field: 'fieldA',
        operator: '=',
        required: false,
        value: 'fieldAValue'
      }
    }
    const expectedAction = {
      type: SET,
      payload: {containerId, filters}
    }

    expect(setFilters(containerId, filters)).toEqual(expectedAction)
  })
})

describe('filters reducer', () => {
  it('should return the initial state', () => {
    const stateAfter = {}
    const result = reducer(undefined, {})

    expect(result).toEqual(stateAfter)
  })

  it('should handle ADD', () => {
    const stateBefore = {}
    const filter = {
      field: 'fieldA',
      operator: '=',
      required: false,
      value: 'fieldAValue'
    }
    const action = {
      type: ADD,
      payload: {containerId, filter}
    }

    deepFreeze(stateBefore)
    deepFreeze(action)

    const result = reducer(stateBefore, action)
    const id = Object.keys(result[containerId])[0]
    const stateAfter = {
      [containerId]: {
        [id]: filter
      }
    }

    expect(result).toEqual(stateAfter)
  })

  it('should handle EDIT', () => {
    const id = uuid.v1()
    const stateBefore = {
      [containerId]: {
        [id]: {
          field: 'fieldA',
          operator: '=',
          value: 'fieldAValue'
        }
      }
    }
    const action = {
      type: EDIT,
      payload: {containerId, id, value: {operator: '>='}}
    }
    const stateAfter = {
      [containerId]: {
        [id]: {
          field: 'fieldA',
          operator: '>=',
          value: 'fieldAValue'
        }
      }
    }

    deepFreeze(stateBefore)
    deepFreeze(action)

    expect(reducer(stateBefore, action)).toEqual(stateAfter)
  })

  it('should handle REMOVE', () => {
    const id = uuid.v1()
    const stateBefore = {
      [containerId]: {
        [id]: {
          field: 'fieldA',
          operator: '=',
          value: 'fieldAValue'
        }
      }
    }
    const action = {
      type: REMOVE,
      payload: {containerId, id}
    }
    const stateAfter = {
      [containerId]: {}
    }

    deepFreeze(stateBefore)
    deepFreeze(action)

    expect(reducer(stateBefore, action)).toEqual(stateAfter)
  })

  it('should handle SET', () => {
    const stateBefore = {}
    const id = uuid.v1()
    const filters = {
      [id]: {
        field: 'fieldA',
        operator: '=',
        value: 'fieldAValue'
      }
    }
    const action = {
      type: SET,
      payload: {containerId, filters}
    }
    const stateAfter = {
      [containerId]: {
        ...filters
      }
    }

    deepFreeze(stateBefore)
    deepFreeze(action)

    expect(reducer(stateBefore, action)).toEqual(stateAfter)
  })
})