/* globals describe, it */

import expect from 'expect'
import {
  SET_DIALOG_OPEN
} from '../../src/js/action-types'
import {
  setDialogOpen
} from '../../src/js/actions'

describe('dialog actions', () => {
  it('setDialogOpen should create a SET_DIALOG_OPEN action', () => {
    const value = true
    const expectedAction = {
      payload: {value},
      type: SET_DIALOG_OPEN
    }

    expect(setDialogOpen(value)).toEqual(expectedAction)
  })
})