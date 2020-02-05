import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducer'


const isDevelopment = process.env.NODE_ENV === 'development';
const enhancers = [];

if (isDevelopment) {
  if (typeof window.__REDUX_DEVTOOLS_EXTENSION__ === 'function') {
    enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__());
  }
}

export const composedEnhancers = compose(
  applyMiddleware(thunk),
  ...enhancers
);


const store = createStore(rootReducer, composedEnhancers);

if (isDevelopment) {
  window.store = store;
  window.app = store.getState;
}

export default store;