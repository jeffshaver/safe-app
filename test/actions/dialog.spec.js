/* globals describe, it */

import expect from 'expect'
import {
  SET_DIALOG_OPEN
} from '../../src/js/actionTypes'
import {
  setDialogOpen
} from '../../src/js/actions'

describe('dialog actions', () => {
  it('setDialogOpen should create a SET_DIALOG_OPEN action', () => {
    const expectedAction = {
      payload: true,
      type: SET_DIALOG_OPEN
    }

    expect(setDialogOpen(true)).toEqual(expectedAction)
  })
})