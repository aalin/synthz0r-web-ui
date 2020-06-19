import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import * as reducers from './reducers'
import apiMiddleware from './api/middleware'

export default ({ websocketUri }) => {
  const api = apiMiddleware(websocketUri)

  return createStore(
    combineReducers(reducers),
    {},
    applyMiddleware(thunk, api)
  )
}
