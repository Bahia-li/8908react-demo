import {
  createStore,
  applyMiddleware
} from 'redux';
import thunk from 'redux-thunk';
import {
  composeWithDevTools
} from 'redux-devtools-extension';

import reducres from './reducers';

export default createStore(
  reducres,
  process.env.NODE_ENV === 'development' ? composeWithDevTools(applyMiddleware(thunk)) : applyMiddleware(thunk)
)