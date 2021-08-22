
import * as actions from '../weather/actionTypes';

export const cityadd = (data) => ({

  type: actions.ADD_CITY,
  paylaod: data
})
export const removecity = (Key) => (
  {
    type: actions.REMOVE_CITY,
    Key

  }
)
export const favoritecity = (obj) => (
  {
    type: actions.FAVORITECIRY,
    obj
  }
)