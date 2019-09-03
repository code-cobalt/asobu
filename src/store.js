import { createStore } from 'redux';
import { reducer, initialState } from "./reducers/reducer.js"

const store = createStore(
  reducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export { store };