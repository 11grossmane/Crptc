import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'

const TOGGLE_LI = 'TOGGLE_LI'
export const toggleLi = bool => {
  return { type: TOGGLE_LI, loggedIn: bool }
}

export const reducer = (loggedIn = false, action) => {
  switch (action.type) {
    case TOGGLE_LI:
      return action.loggedIn

    default:
      return loggedIn
  }
}

export default createStore(reducer, applyMiddleware(logger))
