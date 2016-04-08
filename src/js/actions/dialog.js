import {
    SET_DIALOG_OPEN
} from '../action-types'

export const setDialogOpen = (value) => ({
  type: SET_DIALOG_OPEN,
  payload: {value}
})
