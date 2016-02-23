import expect from 'expect'
import {
  ADD_FILTER,
  EDIT_FILTER,
  REMOVE_FILTER,
  RESET_FILTERS
} from '../../src/js/actionTypes'
import {
  addFilter,
  editFilter,
  removeFilter,
  resetFilters
} from '../../src/js/actions'

describe('filter actions', () =>{
  it('addFilter should create an ADD_FILTER action', () => {
    const filter = {
      id: 0,
      field: 'fieldA',
      operator: '=',
      value: 'fieldAValue'
    }
    const expectedAction = {
      type: ADD_FILTER,
      value: filter
    }

    expect(addFilter(filter)).toEqual(expectedAction)
  })

  it('editFilter should create an EDIT_FILTER action', () => {
    const index = 0
    const value = 'value'
    const expectedAction ={
      type: EDIT_FILTER,
      index,
      value
    }

    expect(editFilter(index, value)).toEqual(expectedAction)
  })

  it('removeFilter should create a REMOVE_FILTER action', () => {
    const index = 0
    const expectedAction = {
      type: REMOVE_FILTER,
      index
    }

    expect(removeFilter(index)).toEqual(expectedAction)
  })

  it('resetFilters should createa RESET_FILTERS action', () => {
    const expectedAction = {
      type: RESET_FILTERS
    }

    expect(resetFilters()).toEqual(expectedAction)
  })
})