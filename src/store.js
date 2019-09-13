import thunk from 'redux-thunk'
import { createStore, compose, applyMiddleware } from 'redux'
import { reducer, initialState } from './reducers/reducer.js'

const createStoreWithMiddleware = compose(applyMiddleware(thunk))(createStore)

const store = createStoreWithMiddleware(
  reducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export { store }
