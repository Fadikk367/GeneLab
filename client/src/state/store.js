import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './rootReducer';
import notificationsMiddleware from './middlewares/notifications';


export const configureStore = preloadedState => {
  const middlewares = [thunkMiddleware, notificationsMiddleware];

  const middlewaresEnhancer = applyMiddleware(...middlewares);
  const enhancers = [middlewaresEnhancer];

  const composedEnhancers = composeWithDevTools(...enhancers);

  const store = createStore(rootReducer, preloadedState, composedEnhancers);

  return store;
}