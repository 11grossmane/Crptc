import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'

const TOGGLE_LI = 'TOGGLE_LI'
export const toggleLi = bool => {
  return { type: TOGGLE_LI, loggedIn: bool }
}

const reducer = (state = {}, action) => {
  switch (action.type) {
    case TOGGLE_LI:
      return { ...state, loggedIn: action.loggedIn }

    default:
      return state
  }
}

export default createStore(reducer, applyMiddleware(logger))
