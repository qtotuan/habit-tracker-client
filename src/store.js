import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers/index'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

export function configureStore() {
  return createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
}

export const store = configureStore()
